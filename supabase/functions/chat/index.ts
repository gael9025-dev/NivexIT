import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    // Opción 1: Usar Vertex AI (GCP) - Recomendado para producción
    // Descomentar y configurar GCP_PROJECT_ID y GCP_ACCESS_TOKEN en Supabase Secrets
    /*
    const GCP_PROJECT_ID = Deno.env.get("GCP_PROJECT_ID");
    const GCP_ACCESS_TOKEN = Deno.env.get("GCP_ACCESS_TOKEN");

    if (!GCP_PROJECT_ID || !GCP_ACCESS_TOKEN) {
      throw new Error("GCP credentials not configured");
    }
    */

    // Opción 2: Usar Lovable AI Gateway (temporal)
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

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

    // TODO: Migrar a Vertex AI en producción
    // Endpoint Vertex AI: https://us-central1-aiplatform.googleapis.com/v1/projects/${GCP_PROJECT_ID}/locations/us-central1/publishers/google/models/gemini-2.0-flash:streamGenerateContent

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Límite de consultas excedido, intenta nuevamente en unos minutos." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Servicio temporalmente no disponible. Por favor contacta a contacto@nivex.cloud" }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
