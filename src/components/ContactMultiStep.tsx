import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronLeft, ChevronRight, Download, FileText, Calculator, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "El nombre es requerido" }).max(100),
  email: z.string().trim().email({ message: "Email inválido" }).max(255),
  company: z.string().trim().min(1, { message: "La empresa es requerida" }).max(100),
  phone: z.string().trim().max(20).optional(),
  companySize: z.string().min(1, { message: "Selecciona el tamaño de empresa" }),
  challenge: z.string().min(1, { message: "Selecciona el desafío principal" }),
  urgency: z.string().min(1, { message: "Selecciona la urgencia" }),
  budget: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar el aviso de privacidad",
  }),
});

type FormData = z.infer<typeof contactSchema>;

const ContactMultiStep = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = (step / 4) * 100;

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number): boolean => {
    try {
      if (currentStep === 1) {
        contactSchema.pick({ name: true, email: true, company: true, phone: true }).parse({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone || "",
        });
      } else if (currentStep === 2) {
        contactSchema.pick({ companySize: true, challenge: true, urgency: true, budget: true, message: true }).parse({
          companySize: formData.companySize,
          challenge: formData.challenge,
          urgency: formData.urgency,
          budget: formData.budget || "",
          message: formData.message || "",
        });
      } else if (currentStep === 3) {
        contactSchema.pick({ privacy: true }).parse({
          privacy: formData.privacy,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error de validación",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      // OPCIÓN 1: Guardar en Firestore (recomendado - gratis)
      // Descomentar cuando configures Firestore:
      /*
      import { saveContact } from '@/integrations/firebase/client';
      const result = await saveContact(validatedData);
      if (!result.success) throw new Error("Error al guardar");
      */

      // OPCIÓN 2: Enviar a webhook Make.com
      // Reemplaza con tu webhook real de Make.com:
      /*
      const response = await fetch("https://hook.us2.make.com/TU_WEBHOOK_REAL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });
      if (!response.ok) throw new Error("Error al enviar");
      */

      // OPCIÓN 3 TEMPORAL: Solo mostrar en consola (para testing)
      console.log("📧 Contacto recibido:", validatedData);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStep(4);
      toast({
        title: "¡Formulario enviado!",
        description: "Recibirás un email de confirmación pronto.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo enviar el formulario",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      {step <= 3 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Paso {step} de 3</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Step 1: Información de Contacto */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-2xl font-bold mb-2">Información de Contacto</h3>
            <p className="text-muted-foreground">Empecemos con tus datos básicos</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <Label htmlFor="email">Email corporativo *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="juan@empresa.com"
              />
            </div>

            <div>
              <Label htmlFor="company">Empresa *</Label>
              <Input
                id="company"
                value={formData.company || ""}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Nombre de tu empresa"
              />
            </div>

            <div>
              <Label htmlFor="phone">Teléfono (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+52 55 1234 5678"
              />
            </div>
          </div>

          <Button onClick={handleNext} className="w-full" size="lg">
            Continuar
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Step 2: Sobre el Proyecto */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-2xl font-bold mb-2">Sobre el Proyecto</h3>
            <p className="text-muted-foreground">Cuéntanos más sobre tu necesidad</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="companySize">Tamaño de empresa *</Label>
              <Select value={formData.companySize} onValueChange={(value) => handleChange("companySize", value)}>
                <SelectTrigger id="companySize">
                  <SelectValue placeholder="Selecciona el tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-50">1-50 empleados</SelectItem>
                  <SelectItem value="51-200">51-200 empleados</SelectItem>
                  <SelectItem value="201-1000">201-1000 empleados</SelectItem>
                  <SelectItem value="1000+">Más de 1000 empleados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="challenge">Principal desafío *</Label>
              <Select value={formData.challenge} onValueChange={(value) => handleChange("challenge", value)}>
                <SelectTrigger id="challenge">
                  <SelectValue placeholder="¿Qué necesitas resolver?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="migration">Migración a Cloud</SelectItem>
                  <SelectItem value="security">Seguridad</SelectItem>
                  <SelectItem value="modernization">Modernización de Aplicaciones</SelectItem>
                  <SelectItem value="analytics">Analytics e IA</SelectItem>
                  <SelectItem value="dr">Disaster Recovery</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgency">Urgencia *</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleChange("urgency", value)}>
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="¿Cuándo necesitas empezar?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Inmediato</SelectItem>
                  <SelectItem value="1-3">1-3 meses</SelectItem>
                  <SelectItem value="3-6">3-6 meses</SelectItem>
                  <SelectItem value="exploratory">Exploratorio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget">Presupuesto estimado (opcional)</Label>
              <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Selecciona un rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<20k">Menos de $20k USD</SelectItem>
                  <SelectItem value="20k-50k">$20k - $50k USD</SelectItem>
                  <SelectItem value="50k-100k">$50k - $100k USD</SelectItem>
                  <SelectItem value=">100k">Más de $100k USD</SelectItem>
                  <SelectItem value="tbd">Por definir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Mensaje adicional (opcional)</Label>
              <Textarea
                id="message"
                value={formData.message || ""}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Cuéntanos más detalles sobre tu proyecto..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleBack} variant="outline" className="flex-1" size="lg">
              <ChevronLeft className="mr-2 w-4 h-4" />
              Atrás
            </Button>
            <Button onClick={handleNext} className="flex-1" size="lg">
              Continuar
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmación */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-2xl font-bold mb-2">Confirmación</h3>
            <p className="text-muted-foreground">Revisa tu información antes de enviar</p>
          </div>

          {/* Summary */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Nombre</p>
                <p className="font-medium">{formData.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Empresa</p>
                <p className="font-medium">{formData.company}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tamaño</p>
                <p className="font-medium">{formData.companySize}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Desafío</p>
                <p className="font-medium">{formData.challenge}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Urgencia</p>
                <p className="font-medium">{formData.urgency}</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Confirma que la información es correcta antes de enviar.
            </p>
          </div>

          {/* Privacy */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.privacy || false}
              onChange={(e) => handleChange("privacy", e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="privacy" className="text-sm text-muted-foreground">
              Acepto el{" "}
              <Link to="/aviso-privacidad" className="text-accent hover:underline">
                Aviso de Privacidad
              </Link>{" "}
              y recibir comunicaciones de Nivex IT. Al enviar, aceptas que procesemos tu información. *
            </label>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleBack} variant="outline" className="flex-1" size="lg">
              <ChevronLeft className="mr-2 w-4 h-4" />
              Atrás
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1" size="lg">
              {isSubmitting ? "Enviando..." : "Solicitar Consultoría Técnica"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Nos pondremos en contacto contigo dentro de <strong>2 horas hábiles</strong> para agendar tu sesión técnica sin costo.
          </p>
        </div>
      )}

      {/* Step 4: Thank You */}
      {step === 4 && (
        <div className="text-center space-y-6 animate-fade-in py-12">
          <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-accent" />
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-3">¡Solicitud Enviada!</h3>
            <p className="text-lg text-muted-foreground">
              Gracias por contactarnos. Hemos recibido tu información y te responderemos pronto.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-sm text-foreground mb-4">
              Te hemos enviado un email de confirmación a <strong>{formData.email}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Nos pondremos en contacto contigo pronto para agendar tu sesión técnica.
            </p>
          </div>

          <div className="flex justify-center">
            <Button size="lg" onClick={() => window.location.reload()}>
              Volver al Inicio
            </Button>
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <h4 className="font-semibold mb-4">Explora más:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <a href="#servicios" className="text-accent hover:underline">
                Nuestros Servicios →
              </a>
              <a href="#equipo" className="text-accent hover:underline">
                Conoce al Equipo →
              </a>
              <a href="#metodologia" className="text-accent hover:underline">
                Nuestra Metodología →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMultiStep;
