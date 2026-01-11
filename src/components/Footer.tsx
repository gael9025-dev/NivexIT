import { Linkedin, Github, Mail, Cloud, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 py-12">
        {/* Certifications Banner */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-accent" />
              <span className="font-semibold text-foreground">Equipo Certificado Google Cloud</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">Experiencia Enterprise México y LATAM</Badge>
              <Badge variant="secondary">Infraestructura Crítica</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Cloud className="w-8 h-8 text-accent" />
                <Shield className="w-4 h-4 text-accent absolute -bottom-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-gradient">Nivex IT</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Consultoría especializada en Google Cloud Platform para empresas en México
            </p>
            <p className="text-xs text-muted-foreground italic">
              "Donde la nube encuentra el suelo"
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Servicios</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#servicios" className="hover:text-accent transition-colors">Migración Cloud</a></li>
              <li><a href="#servicios" className="hover:text-accent transition-colors">Seguridad</a></li>
              <li><a href="#servicios" className="hover:text-accent transition-colors">AI & Analytics</a></li>
              <li><a href="#servicios" className="hover:text-accent transition-colors">Modernización</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Empresa</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#equipo" className="hover:text-accent transition-colors">Equipo</a></li>
              <li><a href="#nosotros" className="hover:text-accent transition-colors">Nosotros</a></li>
              <li><a href="#metodologia" className="hover:text-accent transition-colors">Metodología</a></li>
              <li><a href="#contacto" className="hover:text-accent transition-colors">Contacto</a></li>
              <li><Link to="/aviso-privacidad" className="hover:text-accent transition-colors">Aviso de Privacidad</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:sales@nivex.cloud" className="hover:text-accent transition-colors">
                  sales@nivex.cloud
                </a>
              </li>
              <li>
                <a href="tel:+525566699281" className="hover:text-accent transition-colors">
                  +52 55 6669 9281
                </a>
              </li>
              <li>Ciudad de México, México</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.linkedin.com/company/nivex-it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/nivex-it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:sales@nivex.cloud"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {currentYear} Nivex IT. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Certificados Google Cloud | Consultoría Enterprise | México y Latinoamérica
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
