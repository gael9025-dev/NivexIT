import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background z-10" />
        <img
          src={heroImage}
          alt="Cloud computing visualization"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="bg-accent/10 border border-accent/30 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-accent">Certificados Google Cloud</span>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-accent">Experiencia Enterprise LATAM</span>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-accent">Especialistas en México</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Arquitectura Cloud Enterprise{" "}
            <span className="text-gradient">con Certificación Google Cloud</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Equipo certificado en <strong className="text-foreground">Google Cloud Platform</strong> con experiencia comprobada en proyectos enterprise. 
            Especializados en <strong className="text-foreground">infraestructura crítica</strong> para empresas en México y Latinoamérica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <div className="flex flex-col items-center">
              <Button 
                variant="hero" 
                size="xl" 
                className="group w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Agendar Consultoría Técnica
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <span className="text-sm text-muted-foreground mt-2">Primera sesión sin costo</span>
            </div>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => {
                document.getElementById('metodologia')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Conocer Nuestra Metodología
            </Button>
          </div>

          {/* Credentials */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 max-w-4xl mx-auto">
            {[
              { value: "GCP", label: "Certificados Google Cloud Platform" },
              { value: "Enterprise", label: "Experiencia en Proyectos LATAM" },
              { value: "Crítica", label: "Arquitectura de Infraestructura" },
              { value: "100%", label: "Equipo Dedicado a tu Proyecto" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
