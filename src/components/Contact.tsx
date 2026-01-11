import { Mail, MapPin, Phone } from "lucide-react";
import ContactMultiStep from "./ContactMultiStep";

const Contact = () => {
  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Solicita una <span className="text-gradient">Consultoría</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Agenda una sesión técnica sin costo. Te ayudaremos a definir tu estrategia cloud y a calcular el ROI de tu proyecto.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Mail,
                title: "Email",
                info: "sales@nivex.cloud",
                link: "mailto:sales@nivex.cloud",
              },
              {
                icon: Phone,
                title: "Teléfono",
                info: "+52 55 6669 9281",
                link: "tel:+525566699281",
              },
              {
                icon: MapPin,
                title: "Ubicación",
                info: "Ciudad de México, México",
                link: "#",
              },
            ].map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <a
                  key={index}
                  href={contact.link}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover-lift group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{contact.title}</h3>
                  <p className="text-muted-foreground text-sm">{contact.info}</p>
                </a>
              );
            })}
          </div>

          {/* Multi-Step Form */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
            <ContactMultiStep />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
