import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceDetail {
  name: string;
  description: string;
  benefits: string[];
}

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  details: ServiceDetail[];
  icon: React.ElementType;
}

const ServiceDialog = ({ open, onOpenChange, title, description, details, icon: Icon }: ServiceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <Icon className="w-8 h-8 text-accent" />
            </div>
            <div>
              <DialogTitle className="text-3xl mb-2">{title}</DialogTitle>
              <DialogDescription className="text-base">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {details.map((detail, index) => (
            <Card key={index} className="p-6 border-border/50 hover:border-accent/50 transition-colors">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-accent" />
                      {detail.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {detail.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <h4 className="font-medium text-sm text-accent">Beneficios Clave:</h4>
                  <ul className="space-y-2">
                    {detail.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border border-accent/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">¿Listo para transformar tu negocio?</h3>
              <p className="text-sm text-muted-foreground">
                Contáctanos para una consultoría personalizada y descubre cómo podemos ayudarte.
              </p>
            </div>
            <Button 
              variant="hero" 
              onClick={() => {
                onOpenChange(false);
                setTimeout(() => {
                  const element = document.getElementById("contacto");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
            >
              Contactar Ahora
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
