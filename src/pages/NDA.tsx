import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Mail, Check, ArrowLeft, Calendar, PenTool } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const NDA = () => {
  const { toast } = useToast();
  const [step, setStep] = useState('welcome');
  const [isLoading, setIsLoading] = useState(false);





  const [formData, setFormData] = useState({
    receptorName: '',
    receptorAddress: '',
    receptorEmail: '',
    reveladorAddress: '',
    date: new Date().toISOString().split('T')[0],
    receptorPosition: '',
    receptorCompany: '',
    reveladorName: '',
    reveladorPosition: ''
  });

  const handleInputChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));
  const isFormValid = () =>
    formData.receptorName &&
    formData.receptorAddress &&
    formData.receptorEmail &&
    formData.reveladorAddress &&
    formData.receptorCompany;


  const sendToDocuSign = async () => {
    setIsLoading(true);
    try {
      // Aquí implementaremos la integración con DocuSign
      toast({
        title: "Preparando documento",
        description: "Configurando DocuSign para firmar el NDA...",
      });
      
      // Por ahora, mostramos un mensaje indicando que necesitas configurar DocuSign
      setTimeout(() => {
        toast({
          title: "Configuración necesaria",
          description: "Para usar DocuSign, necesitas configurar tus credenciales de API. ¿Te gustaría que te ayude con esto?",
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo conectar con DocuSign",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const generatePDF = () => window.print();
  const sendEmail = () => {
    const subject = encodeURIComponent('NDA - Nivex Technologies');
    const body = encodeURIComponent(
      `Estimado/a ${formData.receptorName},\n\nAdjunto encontrará el Acuerdo de Confidencialidad (NDA) para su revisión y firma.\n\nSaludos cordiales,\nNivex Technologies`
    );
    window.open(`mailto:${formData.receptorEmail}?subject=${subject}&body=${body}`);
  };

  const steps = ['welcome', 'form', 'preview'];
  const progress = ((steps.indexOf(step) + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="print:hidden">
        <Navbar />
      </div>
      
      {/* Barra de progreso */}
      {step !== 'welcome' && (
        <motion.div
          className="h-1 bg-accent fixed top-0 left-0 z-50 print:hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      )}

      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.section
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-center min-h-screen p-4 pt-24"
          >
            <div className="max-w-xl w-full glass-card rounded-3xl shadow-xl p-10 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-extrabold mb-3 text-foreground">Nivex Technologies</h1>
              <p className="text-accent text-lg mb-8 font-semibold">Portal de Acuerdos de Confidencialidad</p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Genere, revise y envíe acuerdos de confidencialidad (NDA) con facilidad y respaldo legal.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep('form')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-semibold shadow-lg transition-all"
              >
                Comenzar →
              </motion.button>
            </div>
          </motion.section>
        )}

        {step === 'form' && (
          <motion.section
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="p-8 max-w-5xl mx-auto pt-32"
          >
            <button 
              onClick={() => setStep('welcome')} 
              className="flex items-center text-accent mb-6 hover:text-accent/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Volver
            </button>
            <div className="bg-card rounded-3xl shadow-xl border border-border p-8 md:p-12">
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">Información del Acuerdo</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  ['Nombre del Representante Legal *', 'reveladorName', 'text', 'Ej: Juan Pérez González'],
                  ['Cargo *', 'reveladorPosition', 'text', 'Director General'],
                  ['Domicilio de Nivex Technologies *', 'reveladorAddress', 'text', 'Dirección completa de Nivex']
                ].map(([label, field, type, placeholder]) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
                    <input
                      type={type}
                      value={formData[field as keyof typeof formData]}
                      onChange={e => handleInputChange(field, e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all bg-background text-foreground ${
                        !formData[field as keyof typeof formData] ? 'border-border' : 'border-accent'
                      } focus:border-accent focus:ring-2 focus:ring-accent/20`}
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-border my-10" />

              <h3 className="text-2xl font-bold text-foreground mb-6">Parte Receptora</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  ['Nombre del Receptor *', 'receptorName', 'text', 'Nombre completo o razón social'],
                  ['Empresa *', 'receptorCompany', 'text', 'Nombre de la empresa'],
                  ['Correo Electrónico *', 'receptorEmail', 'email', 'email@empresa.com'],
                  ['Cargo / Posición', 'receptorPosition', 'text', 'CEO, Director, etc.']
                ].map(([label, field, type, placeholder]) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
                    <input
                      type={type}
                      value={formData[field as keyof typeof formData]}
                      onChange={e => handleInputChange(field, e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all bg-background text-foreground ${
                        !formData[field as keyof typeof formData] && label.includes('*') ? 'border-destructive' : 'border-border'
                      } focus:border-accent focus:ring-2 focus:ring-accent/20`}
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <label className="block text-sm font-semibold text-foreground mb-2">Domicilio Completo *</label>
                <input
                  type="text"
                  value={formData.receptorAddress}
                  onChange={e => handleInputChange('receptorAddress', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 bg-background text-foreground"
                  placeholder="Calle, número, colonia, ciudad, estado, C.P."
                />
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Calendar className="text-accent w-6 h-6" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => handleInputChange('date', e.target.value)}
                  className="px-4 py-3 border-2 border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 bg-background text-foreground"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={!isFormValid()}
                onClick={() => setStep('preview')}
                className={`w-full mt-10 py-4 rounded-xl font-semibold text-lg transition-all ${
                  isFormValid()
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Continuar a Vista Previa →
              </motion.button>
            </div>
          </motion.section>
        )}

        {step === 'preview' && (
          <motion.section
            key="preview"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="p-8 max-w-6xl mx-auto pt-32"
          >
            <div className="flex justify-between items-center mb-8 print:hidden">
              <button
                onClick={() => setStep('form')}
                className="flex items-center text-accent hover:text-accent/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Editar
              </button>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={sendToDocuSign}
                  disabled={isLoading}
                  className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PenTool className="inline w-5 h-5 mr-2" /> 
                  {isLoading ? 'Procesando...' : 'Firmar con DocuSign'}
                </button>
                <button
                  onClick={generatePDF}
                  className="bg-background text-accent border-2 border-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent/10 transition-all"
                >
                  <Download className="inline w-5 h-5 mr-2" /> Descargar PDF
                </button>
                <button
                  onClick={sendEmail}
                  className="bg-background text-accent border-2 border-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent/10 transition-all"
                >
                  <Mail className="inline w-5 h-5 mr-2" /> Enviar por Email
                </button>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-xl border border-border p-10 max-w-4xl mx-auto">
              <div className="w-20 h-20 mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Acuerdo de Confidencialidad (NDA)</h2>
              
              <p className="text-foreground leading-relaxed text-justify mb-6">
                Este Acuerdo se celebra entre <strong>Nivex Technologies</strong> ("Parte Reveladora") y{' '}
                <strong>{formData.receptorCompany}</strong> ("Parte Receptora"), con fecha{' '}
                {new Date(formData.date).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}.
              </p>

              <h3 className="text-2xl font-bold text-accent mb-4 mt-8">Considerandos</h3>
              <p className="text-foreground leading-relaxed text-justify mb-4">
                La Parte Reveladora posee información de naturaleza confidencial, propietaria y estratégica que desea proteger adecuadamente. La Parte Receptora reconoce el valor de dicha información y acepta recibirla bajo los términos y condiciones establecidos en el presente Acuerdo, con el propósito de evaluar, desarrollar o ejecutar una posible relación comercial, de prestación de servicios, o cualquier otra colaboración que ambas partes acuerden mutuamente.
              </p>
              <p className="text-foreground leading-relaxed text-justify mb-6">
                Ambas partes reconocen la importancia de mantener la confidencialidad de la información compartida y se comprometen a cumplir con las obligaciones establecidas en este instrumento legal.
              </p>

              <h3 className="text-2xl font-bold text-accent mb-4 mt-8">Cláusulas</h3>

              {/* Cláusula 1 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">1. Definición de Información Confidencial</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  Para efectos del presente Acuerdo, se entenderá por "Información Confidencial" toda aquella información de carácter reservado, propietario o sensible que sea revelada por la Parte Reveladora a la Parte Receptora, incluyendo de manera enunciativa mas no limitativa:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-foreground mb-3">
                  <li>Datos técnicos, comerciales, financieros y estratégicos de la empresa</li>
                  <li>Especificaciones técnicas, planos, diseños, metodologías y procesos</li>
                  <li>Software, código fuente, algoritmos, bases de datos y desarrollos tecnológicos</li>
                  <li>Planes de negocio, estrategias comerciales, análisis de mercado y proyecciones financieras</li>
                  <li>Información sobre clientes, proveedores, socios comerciales y empleados</li>
                  <li>Propiedad intelectual, patentes, marcas registradas y secretos industriales</li>
                  <li>Cualquier otra información proporcionada de forma oral, escrita, electrónica, gráfica o en cualquier otro formato o medio de almacenamiento</li>
                </ul>
                <p className="text-foreground leading-relaxed text-justify">
                  Se recomienda que la Parte Reveladora identifique claramente los documentos y materiales como "Confidencial" o "Propietario" cuando sea posible. Sin embargo, la ausencia de dicha marca no eximirá a la Parte Receptora de sus obligaciones bajo este Acuerdo.
                </p>
              </div>

              {/* Cláusula 2 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">2. Exclusiones de Información Confidencial</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  No se considerará Información Confidencial bajo los términos de este Acuerdo aquella información que:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-foreground">
                  <li>Sea o se convierta en información de dominio público sin que exista incumplimiento del presente Acuerdo por parte de la Parte Receptora</li>
                  <li>Ya estuviera legítimamente en posesión de la Parte Receptora antes de su divulgación por la Parte Reveladora, sin estar sujeta a obligación alguna de confidencialidad</li>
                  <li>Sea obtenida legítimamente por la Parte Receptora de un tercero autorizado para divulgarla, sin restricción de confidencialidad</li>
                  <li>Sea desarrollada de manera independiente por la Parte Receptora sin utilizar o hacer referencia a la Información Confidencial proporcionada</li>
                  <li>Deba ser divulgada en cumplimiento de una orden judicial, requerimiento legal o mandato de autoridad competente, siempre que la Parte Receptora notifique previamente y por escrito a la Parte Reveladora para que ésta pueda ejercer las acciones legales que estime pertinentes</li>
                </ul>
              </div>

              {/* Cláusula 3 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">3. Obligaciones de la Parte Receptora</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  La Parte Receptora se compromete expresamente a:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-foreground">
                  <li>Mantener la más estricta confidencialidad sobre toda la Información Confidencial recibida</li>
                  <li>Utilizar la Información Confidencial exclusivamente para los fines autorizados expresamente por la Parte Reveladora</li>
                  <li>No divulgar, publicar, reproducir, distribuir o comunicar la Información Confidencial a terceros sin el consentimiento previo y por escrito de la Parte Reveladora</li>
                  <li>Limitar el acceso a la Información Confidencial únicamente a empleados, consultores, asesores o colaboradores que necesiten conocerla para los fines autorizados, asegurándose de que dichas personas estén sujetas a obligaciones de confidencialidad al menos tan restrictivas como las establecidas en este Acuerdo</li>
                  <li>Implementar y mantener medidas de seguridad física, técnica y administrativa razonables y apropiadas para proteger la Información Confidencial contra acceso no autorizado, pérdida, destrucción, alteración o divulgación</li>
                  <li>Devolver o destruir de manera segura toda la Información Confidencial, incluyendo copias, reproducciones y extractos, cuando la Parte Reveladora lo solicite por escrito o al término de la relación comercial</li>
                  <li>Notificar inmediatamente a la Parte Reveladora sobre cualquier uso no autorizado, divulgación o pérdida de la Información Confidencial de la que tenga conocimiento</li>
                </ul>
              </div>

              {/* Cláusula 4 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">4. Vigencia y Duración del Acuerdo</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  Este Acuerdo entrará en vigor a partir de la fecha de su firma y permanecerá vigente mientras la información mantenga su carácter confidencial, o hasta que la Parte Reveladora libere expresamente y por escrito a la Parte Receptora de sus obligaciones de confidencialidad.
                </p>
                <p className="text-foreground leading-relaxed text-justify">
                  En cualquier caso, las obligaciones de confidencialidad establecidas en este Acuerdo subsistirán por un periodo mínimo de tres (3) años contados a partir de la fecha de terminación o conclusión de la relación comercial o de colaboración entre las partes, salvo pacto en contrario por escrito.
                </p>
              </div>

              {/* Cláusula 5 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">5. Propiedad de la Información</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  Toda la Información Confidencial revelada permanecerá como propiedad exclusiva de la Parte Reveladora. La divulgación de dicha información no otorga a la Parte Receptora derecho, licencia, título o interés alguno sobre la misma, ni sobre cualquier patente, marca, derecho de autor u otro derecho de propiedad intelectual relacionado.
                </p>
                <p className="text-foreground leading-relaxed text-justify">
                  Ninguna disposición de este Acuerdo deberá interpretarse como una cesión, transferencia o licencia de derechos de propiedad intelectual a favor de la Parte Receptora.
                </p>
              </div>

              {/* Cláusula 6 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">6. Naturaleza de la Relación entre las Partes</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  Las partes acuerdan expresamente que este Acuerdo no crea, ni implica, ni podrá interpretarse como creador de relación laboral, sociedad mercantil, asociación en participación, joint venture, relación de agencia, representación o mandato entre ellas. Cada parte actuará de manera independiente y por su propia cuenta en el cumplimiento de sus respectivas obligaciones.
                </p>
                <p className="text-foreground leading-relaxed text-justify">
                  Este Acuerdo tampoco constituye compromiso u obligación alguna de las partes para celebrar acuerdos futuros, establecer relaciones comerciales o realizar transacción alguna.
                </p>
              </div>

              {/* Cláusula 7 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">7. Incumplimiento y Remedios Legales</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  Las partes reconocen que el incumplimiento de cualquier disposición de este Acuerdo causará daños irreparables a la Parte Reveladora, para los cuales los remedios en dinero podrían resultar insuficientes. En consecuencia, ante cualquier incumplimiento o amenaza de incumplimiento, la Parte Reveladora tendrá derecho a:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-foreground mb-3">
                  <li>Solicitar medidas cautelares o precautorias, incluyendo órdenes de restricción temporal o permanente, sin necesidad de comprobar daño o prestar garantía</li>
                  <li>Exigir el cumplimiento específico de las obligaciones contractuales</li>
                  <li>Reclamar indemnización por daños y perjuicios, incluyendo daño emergente, lucro cesante, daño moral y cualquier otro daño derivado del incumplimiento</li>
                  <li>Ejercer cualquier otro recurso o acción legal disponible conforme a la legislación aplicable</li>
                </ul>
                <p className="text-foreground leading-relaxed text-justify">
                  Estos recursos son acumulativos y no excluyentes entre sí ni de cualquier otro recurso disponible en derecho o en equidad.
                </p>
              </div>

              {/* Cláusula 8 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">8. Ley Aplicable y Jurisdicción</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  Este Acuerdo se regirá, interpretará y ejecutará de conformidad con las leyes federales de los Estados Unidos Mexicanos, sin dar efecto a ningún principio de conflicto de leyes.
                </p>
                <p className="text-foreground leading-relaxed text-justify">
                  Para todo lo relacionado con la interpretación, cumplimiento y ejecución de este Acuerdo, las partes se someten expresamente a la jurisdicción de los tribunales competentes con residencia en la Ciudad de México, renunciando expresamente a cualquier otro fuero o jurisdicción que por razón de sus domicilios presentes o futuros, o por cualquier otra causa, pudiera corresponderles.
                </p>
              </div>

              {/* Cláusula 9 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">9. Divisibilidad de Cláusulas</h4>
                <p className="text-foreground leading-relaxed text-justify">
                  Si cualquier disposición de este Acuerdo fuera declarada inválida, ilegal o inejecutable por autoridad competente, dicha disposición se considerará separable del resto del Acuerdo, y las demás disposiciones continuarán en pleno vigor y efecto legal. Las partes acuerdan sustituir cualquier disposición inválida por una válida que refleje lo más fielmente posible la intención original de las partes.
                </p>
              </div>

              {/* Cláusula 10 */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-foreground mb-2">10. Acuerdo Integral y Modificaciones</h4>
                <p className="text-foreground leading-relaxed text-justify mb-3">
                  Este Acuerdo constituye el entendimiento completo e integral entre las partes respecto al objeto del mismo, y sustituye y deja sin efecto todos los acuerdos, negociaciones, entendimientos y comunicaciones previas, ya sean orales o escritas, entre las partes con relación al objeto de este Acuerdo.
                </p>
                <p className="text-foreground leading-relaxed text-justify">
                  Cualquier modificación, enmienda, adición o renuncia a los términos de este Acuerdo deberá constar por escrito y ser firmada por ambas partes para tener validez y eficacia legal. Ninguna costumbre, práctica o curso de negociaciones entre las partes podrá interpretarse como modificación a este Acuerdo.
                </p>
              </div>

              {/* Cláusula 11 */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-foreground mb-2">11. Notificaciones</h4>
                <p className="text-foreground leading-relaxed text-justify">
                  Todas las notificaciones, solicitudes, demandas y otras comunicaciones requeridas o permitidas bajo este Acuerdo deberán realizarse por escrito y se considerarán debidamente efectuadas cuando sean entregadas personalmente, enviadas por servicio de mensajería con acuse de recibo, o por correo certificado con acuse de recibo, a los domicilios indicados en el encabezado de este Acuerdo, o a los domicilios que las partes notifiquen posteriormente por escrito.
                </p>
              </div>

              <div className="mt-10 grid md:grid-cols-2 gap-8 pt-8 border-t-2 border-border">
                <div>
                  <h4 className="font-bold text-accent mb-2">Nivex Technologies</h4>
                  <p className="text-foreground">{formData.reveladorAddress}</p>
                  <p className="text-foreground">Rep: {formData.reveladorName}</p>
                  <p className="text-foreground">{formData.reveladorPosition}</p>
                </div>
                <div>
                  <h4 className="font-bold text-accent mb-2">{formData.receptorCompany}</h4>
                  <p className="text-foreground">{formData.receptorAddress}</p>
                  <p className="text-foreground">{formData.receptorName}</p>
                  <p className="text-foreground">{formData.receptorPosition}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center print:hidden">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className="inline-flex items-center bg-accent/10 border border-accent text-accent px-6 py-3 rounded-full font-semibold"
              >
                <Check className="w-5 h-5 mr-2" /> ¡Documento listo para firmar!
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default NDA;
