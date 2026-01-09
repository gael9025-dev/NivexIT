import { Factory, ShoppingCart, Wallet, Hospital, Building2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const industries = [
  {
    icon: Factory,
    name: "Manufactura",
    description: "Experiencia en migración de infraestructura legacy y modernización de sistemas de producción",
    technologies: "GKE, Cloud SQL, Cloud Storage",
  },
  {
    icon: ShoppingCart,
    name: "Retail",
    description: "Implementación de arquitecturas escalables para e-commerce y disaster recovery",
    technologies: "Cloud Run, BigQuery, Firebase",
  },
  {
    icon: Wallet,
    name: "Fintech",
    description: "Proyectos de seguridad, compliance y modernización de aplicaciones críticas",
    technologies: "GKE, Cloud Armor, Secret Manager",
  },
  {
    icon: Hospital,
    name: "Salud",
    description: "Infraestructura cloud con cumplimiento de normativas de privacidad de datos",
    technologies: "VPC Service Controls, DLP, CMEK",
  },
  {
    icon: Building2,
    name: "Gobierno",
    description: "Soluciones cloud para organismos públicos con altos estándares de seguridad",
    technologies: "Private Google Access, VPN, IAM",
  },
  {
    icon: Users,
    name: "Servicios",
    description: "Modernización de aplicaciones y optimización de costos operativos",
    technologies: "Cloud Functions, Pub/Sub, Monitoring",
  },
];

const Experience = () => {
  return (
    <section id="experiencia" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Dónde Hemos <span className="text-gradient">Trabajado</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Sectores e industrias donde nuestro equipo ha desarrollado proyectos con Google Cloud Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <Card
                key={index}
                className="group hover-lift border-border/50 hover:border-accent/50 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-accent transition-colors">
                    {industry.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">Tecnologías GCP:</p>
                    <p className="text-sm text-accent font-medium">{industry.technologies}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground italic">
            Experiencia del equipo en proyectos enterprise previos con Google Cloud Platform
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;