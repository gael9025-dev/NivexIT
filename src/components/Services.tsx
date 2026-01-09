import { useState } from "react";
import { Shield, Cloud, Brain, Network, Wrench, Eye, Headphones, Mail, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceDialog from "./ServiceDialog";
import { serviceDetails } from "@/data/serviceDetails";

const services = [
  {
    icon: Shield,
    title: "Seguridad",
    description: "Security Command Center, NGFW, Assessment & Implementation",
    items: ["Security Command Center", "Next Generation Firewall", "Assessment e Improvement"],
    detailsKey: "seguridad" as const,
  },
  {
    icon: Cloud,
    title: "Modernización de Infraestructura",
    description: "Cloud Migration, Landing Zone, Disaster Recovery",
    items: ["Cloud Migration", "Landing Zone", "Disaster Recovery Plan", "Lift & Shift VMware Engine", "Backup & DR", "Veeam"],
    detailsKey: "infraestructura" as const,
  },
  {
    icon: Brain,
    title: "Smart Analytics & AI",
    description: "Data Lakehouse, MLOps, Customer Data Platform",
    items: ["Looker", "Google MLOps", "Cloud Spanner", "Google Data Lakehouse", "Customer Data Platform", "Data Warehouse"],
    detailsKey: "analytics" as const,
  },
  {
    icon: Network,
    title: "Redes",
    description: "Conectividad Multi-Cloud y arquitectura de red",
    items: ["Conectividad Multi-Cloud", "Partner Interconnect", "VPN", "VPC"],
    detailsKey: "redes" as const,
  },
  {
    icon: Wrench,
    title: "Application Modernization",
    description: "DevSecOps, Microservices, API Management",
    items: ["API Factory", "DevSecOps", "Apigee + Anthos", "Microservices Factory", "API Management con Apigee"],
    detailsKey: "modernizacion" as const,
  },
  {
    icon: Eye,
    title: "Observabilidad",
    description: "Monitoring, Cost Management y análisis de rendimiento",
    items: ["Datadog", "Cloud Monitoring", "Cloud Cost Management"],
    detailsKey: "observabilidad" as const,
  },
  {
    icon: Headphones,
    title: "Soporte",
    description: "Soporte técnico 24/7 para tu tranquilidad",
    items: ["Soporte 24/7"],
    detailsKey: "soporte" as const,
  },
  {
    icon: Mail,
    title: "Google Workspace",
    description: "Suite colaborativa empresarial",
    items: ["Google Workspace"],
    detailsKey: "workspace" as const,
  },
  {
    icon: Zap,
    title: "Automatizaciones",
    description: "Workflows inteligentes con N8N",
    items: ["N8N"],
    detailsKey: "automatizacion" as const,
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <>
      <section id="servicios" className="py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Soluciones <span className="text-gradient">Empresariales</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Servicios tecnológicos integrales diseñados para impulsar la transformación digital de su organización
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover-lift glass-card border-border/50 hover:border-accent/50 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedService(service)}
                >
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-accent" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {selectedService && (
        <ServiceDialog
          open={!!selectedService}
          onOpenChange={(open) => !open && setSelectedService(null)}
          title={selectedService.title}
          description={selectedService.description}
          details={serviceDetails[selectedService.detailsKey]}
          icon={selectedService.icon}
        />
      )}
    </>
  );
};

export default Services;
