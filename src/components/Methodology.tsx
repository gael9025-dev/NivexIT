import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Análisis",
    description: "Evaluación exhaustiva de infraestructura actual, procesos operativos y objetivos estratégicos del negocio.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Estrategia",
    description: "Desarrollo de arquitectura personalizada y roadmap de implementación alineado con objetivos empresariales.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Ejecución",
    description: "Implementación técnica siguiendo metodologías ágiles y mejores prácticas internacionales del sector.",
    color: "from-teal-500 to-green-500",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Optimización",
    description: "Capacitación del equipo, transferencia de conocimiento y soporte continuo para garantizar la excelencia operativa.",
    color: "from-green-500 to-emerald-500",
  },
];

const Methodology = () => {
  return (
    <section id="metodologia" className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Metodología de <span className="text-gradient">Implementación</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Proceso estructurado en cuatro etapas para garantizar resultados medibles y sostenibles
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Connection line (hidden on mobile) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-accent/20 z-0" />
                  )}

                  {/* Card */}
                  <div className="relative z-10 p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover-lift h-full">
                    {/* Number badge */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom statement */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20">
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-xl text-muted-foreground">
                Seguimos las <span className="text-accent font-semibold">mejores prácticas de Google Cloud</span>
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>Documentación técnica completa incluida</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>Capacitación de tu equipo interno</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>Transferencia de conocimiento estructurada</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>Acompañamiento post-lanzamiento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
