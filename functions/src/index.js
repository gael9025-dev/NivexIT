const {onRequest} = require("firebase-functions/v2/https");

const PROJECT_ID = "nivex-it";
const LOCATION = "us-central1";
const MODEL = "gemini-2.0-flash-exp";

exports.chat = onRequest(
  {
    region: "us-central1",
    cors: true,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({error: "Method not allowed"});
      return;
    }

    try {
      const {messages} = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({error: "Invalid request body"});
        return;
      }

      // System prompt para Nivex IT
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
- WhatsApp: +52 55 6669 9281
- Ubicación: Ciudad de México, México
- Sitio web: nivex.cloud

Mantén un tono profesional y técnico. Enfócate en soluciones GCP y casos de uso prácticos.`;

      // Preparar mensajes para Gemini API
      const contents = [
        {
          role: "user",
          parts: [{text: systemPrompt}],
        },
        {
          role: "model",
          parts: [{text: "Entendido. Estoy listo para asistir como representante de Nivex IT."}],
        },
      ];

      // Agregar los mensajes del usuario
      for (const msg of messages) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{text: msg.content}],
        });
      }

      // Obtener access token de Google Cloud (lazy load)
      const {GoogleAuth} = require("google-auth-library");
      const auth = new GoogleAuth({
        scopes: "https://www.googleapis.com/auth/cloud-platform",
      });
      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();

      if (!accessToken.token) {
        throw new Error("Failed to get access token");
      }

      // Llamar a Vertex AI REST API
      const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 0.95,
            topK: 40,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Vertex AI error:", response.status, errorText);
        throw new Error(`Vertex AI error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response from Vertex AI");
      }

      const candidate = data.candidates[0];
      const content = candidate.content?.parts?.[0]?.text ||
                      "Lo siento, no pude generar una respuesta.";

      res.json({
        role: "assistant",
        content,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);
