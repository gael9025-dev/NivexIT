import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Award, Briefcase } from "lucide-react";

const teamMembers = [
  {
    name: "Jorge Pacheco",
    role: "CEO & Cloud Architect",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
    certifications: [
      "Google Cloud Professional Architect",
      "Google Cloud Security Engineer",
      "Kubernetes Administrator (CKA)"
    ],
    experience: "12+ años",
    projects: "80+",
    companies: "ex-Accenture, ex-Deloitte",
    linkedin: "#"
  },
  {
    name: "María González",
    role: "Lead DevOps Engineer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    certifications: [
      "Google Cloud DevOps Engineer",
      "Terraform Associate",
      "AWS Solutions Architect"
    ],
    experience: "8+ años",
    projects: "60+",
    companies: "ex-BBVA, ex-IBM",
    linkedin: "#"
  },
  {
    name: "Carlos Ramírez",
    role: "Security Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    certifications: [
      "Google Cloud Security Engineer",
      "CISSP",
      "CEH (Certified Ethical Hacker)"
    ],
    experience: "10+ años",
    projects: "50+",
    companies: "ex-Telefónica, ex-Banorte",
    linkedin: "#"
  }
];

const Team = () => {
  return (
    <section id="equipo" className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Nuestro <span className="text-gradient">Equipo</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Equipo Boutique, Enfoque Enterprise
          </p>
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 max-w-2xl mx-auto space-y-3">
            <p className="text-foreground leading-relaxed">
              Arquitectos certificados Google Cloud con experiencia en infraestructura crítica para grandes empresas en México y Latinoamérica. 
              Tu proyecto recibe <strong>atención directa de expertos</strong>, no se delega.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Atención directa de arquitectos certificados GCP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Decisiones técnicas rápidas, sin capas de aprobación</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Conocimiento profundo del mercado mexicano y latinoamericano</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group hover-lift professional-card border-border/50 hover:border-accent/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-accent font-medium">{member.role}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Briefcase className="w-4 h-4 text-accent" />
                      <span className="text-xs text-muted-foreground">Experiencia</span>
                    </div>
                    <div className="text-sm font-bold text-foreground">{member.experience}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Award className="w-4 h-4 text-accent" />
                      <span className="text-xs text-muted-foreground">Proyectos</span>
                    </div>
                    <div className="text-sm font-bold text-foreground">{member.projects}</div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Certificaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert, certIndex) => (
                      <Badge
                        key={certIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Previous Companies */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    {member.companies}
                  </p>
                </div>

                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium pt-2"
                >
                  <Linkedin className="w-4 h-4" />
                  Ver perfil en LinkedIn
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
