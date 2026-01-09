import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Target, Users, Award } from "lucide-react";

const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Sobre <span className="text-gradient">Nivex IT</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Consultoría nueva con equipo experimentado en proyectos enterprise
            </p>
          </div>

          {/* Story */}
          <div className="prose prose-lg max-w-none mb-16">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Nuestra Historia</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nivex IT nace de la experiencia de dos arquitectos cloud certificados que trabajaron en proyectos enterprise 
                para grandes empresas en México y LATAM. Con trayectorias en consultoras globales y empresas tecnológicas líderes, 
                decidimos crear una alternativa diferente: <strong className="text-foreground">experiencia enterprise con atención personalizada</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El nombre <strong className="text-foreground">Nivex</strong> representa nuestra misión: elevar 
                al siguiente <em>nivel</em> la infraestructura tecnológica. La conexión con <em>Niveus</em> (latín: nube) 
                y nuestro dominio <strong className="text-accent">.cloud</strong> refuerzan nuestra especialización en Google Cloud Platform.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro tagline <em className="text-accent">"Donde la nube encuentra el suelo"</em> refleja nuestra filosofía: 
                convertir la complejidad técnica de la nube en soluciones prácticas que generan valor real para tu negocio.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Cloud,
                title: "Especialización GCP",
                description: "Enfoque exclusivo en Google Cloud Platform con certificaciones vigentes y experiencia comprobada"
              },
              {
                icon: Target,
                title: "Honestidad",
                description: "Comunicación transparente sobre capacidades, plazos y alcances. Sin promesas que no podamos cumplir"
              },
              {
                icon: Users,
                title: "Atención Directa",
                description: "Tu proyecto lo manejan arquitectos certificados personalmente, sin delegación a terceros"
              },
              {
                icon: Award,
                title: "Excelencia Técnica",
                description: "Mejores prácticas de Google Cloud implementadas con rigor en cada proyecto"
              },
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="group hover-lift border-border/50 hover:border-accent/50 transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Why GCP */}
          <div className="mt-16 bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">¿Por qué Google Cloud?</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Elegimos especializarnos en Google Cloud Platform por su enfoque en innovación, seguridad y herramientas 
              de inteligencia artificial y analytics de clase mundial. GCP es la plataforma ideal para empresas que buscan:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Infraestructura global con las mejores garantías de uptime de la industria</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Herramientas de IA y ML líderes (Vertex AI, BigQuery ML)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Modelo de seguridad BeyondCorp de confianza cero</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Pricing transparente y sin costos ocultos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
