/**
 * Supabase Edge Function: Chatbot con Vertex AI (Gemini)
 *
 * Este edge function utiliza Vertex AI de Google Cloud Platform
 * para proporcionar respuestas del chatbot usando Gemini 2.0 Flash.
 *
 * Configuración requerida en Supabase Secrets:
 * - GCP_PROJECT_ID: ID del proyecto GCP
 * - GCP_SERVICE_ACCOUNT_KEY: JSON key de service account con permisos Vertex AI
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Message {
  role: string;
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages }: { messages: Message[] } = await req.json();

    // Configuración de GCP
    const GCP_PROJECT_ID = Deno.env.get("GCP_PROJECT_ID");
    const GCP_SERVICE_ACCOUNT_KEY = Deno.env.get("GCP_SERVICE_ACCOUNT_KEY");

    if (!GCP_PROJECT_ID || !GCP_SERVICE_ACCOUNT_KEY) {
      throw new Error("GCP credentials not configured. Set GCP_PROJECT_ID and GCP_SERVICE_ACCOUNT_KEY in Supabase Secrets.");
    }

    // Parse service account key
    const serviceAccount = JSON.parse(GCP_SERVICE_ACCOUNT_KEY);

    // Obtener access token de GCP
    const accessToken = await getGCPAccessToken(serviceAccount);

    // System prompt optimizado para Nivex IT
    const systemPrompt = `Eres un asistente virtual profesional de Nivex IT, una consultora especializada en Google Cloud Platform (GCP) con presencia en México y LATAM.

Servicios principales:
- Consultoría y arquitectura Google Cloud Platform (GCP)
- Migración a GCP (lift-and-shift, re-architecting, modernización)
- Seguridad cloud y compliance (ISO 27001, SOC 2, PCI-DSS)
- DevOps y CI/CD en GCP (Cloud Build, Artifact Registry, GKE)
- Infraestructura como código (Terraform, Deployment Manager)
- Optimización de costos GCP
- Soporte técnico especializado 24/7
- Certificaciones Google Cloud Professional

Industrias atendidas:
- Manufactura y logística
- Retail y e-commerce
- Fintech y banca
- Salud y healthcare
- Gobierno y sector público
- Startups tecnológicas

Tu objetivo es:
1. Responder preguntas sobre servicios de Google Cloud Platform
2. Orientar sobre mejores prácticas en GCP y arquitectura cloud
3. Ayudar a los visitantes a entender cómo Nivex IT puede resolver sus necesidades cloud
4. Ser profesional, técnico y conciso
5. Si no sabes algo específico, sugiere que contacten al equipo técnico

Información de contacto:
- Email: contacto@nivex.cloud
- WhatsApp: +52 56 1190 7195
- Ubicación: Ciudad de México, México
- Sitio web: nivex.cloud

Mantén un tono profesional y técnico. Enfócate en soluciones GCP y casos de uso prácticos.`;

    // Convertir mensajes al formato de Vertex AI
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    ];

    // Llamada a Vertex AI API
    const vertexEndpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/${GCP_PROJECT_ID}/locations/us-central1/publishers/google/models/gemini-2.0-flash-exp:streamGenerateContent`;

    const response = await fetch(vertexEndpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Vertex AI error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Límite de consultas excedido, intenta nuevamente en unos minutos." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: "Error al procesar la consulta. Por favor intenta nuevamente." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

/**
 * Obtiene un access token de GCP usando Service Account credentials
 */
async function getGCPAccessToken(serviceAccount: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600; // 1 hora

  // Crear JWT assertion
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const claimSet = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    exp: expiry,
    iat: now,
  };

  const headerBase64 = btoa(JSON.stringify(header));
  const claimSetBase64 = btoa(JSON.stringify(claimSet));
  const signatureInput = `${headerBase64}.${claimSetBase64}`;

  // Firmar con la private key del service account
  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    str2ab(atob(serviceAccount.private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, ""))),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(signatureInput)
  );

  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const jwt = `${signatureInput}.${signatureBase64}`;

  // Intercambiar JWT por access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!tokenResponse.ok) {
    throw new Error("Failed to obtain GCP access token");
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

/**
 * Convierte string a ArrayBuffer
 */
function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
