import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-4 py-24 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Aviso de Privacidad</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Identidad y Domicilio del Responsable</h2>
            <p>
              Nivex IT (en adelante "Nivex IT"), con domicilio en Ciudad de México, México, 
              es responsable del tratamiento de sus datos personales de conformidad con la Ley Federal de Protección de Datos 
              Personales en Posesión de los Particulares (en adelante la "LFPDPPP").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Datos Personales que se Recaban</h2>
            <p>
              Para las finalidades señaladas en el presente aviso de privacidad, podemos recabar sus datos personales de 
              distintas formas: cuando usted nos los proporciona directamente a través de nuestro sitio web, cuando visita 
              nuestro sitio web o utiliza nuestros servicios en línea.
            </p>
            <p className="mt-4">Los datos personales que recabamos incluyen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nombre completo</li>
              <li>Correo electrónico corporativo</li>
              <li>Empresa</li>
              <li>Mensaje o consulta</li>
              <li>Información técnica (dirección IP, tipo de navegador, cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Finalidades del Tratamiento</h2>
            <p>Los datos personales que recabamos serán utilizados para las siguientes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a sus consultas y solicitudes de información</li>
              <li>Proporcionarle servicios de consultoría tecnológica</li>
              <li>Enviarle información sobre nuestros servicios y soluciones</li>
              <li>Mantener comunicación con usted sobre temas de interés profesional</li>
              <li>Mejorar nuestros servicios y experiencia del usuario</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Transferencia de Datos Personales</h2>
            <p>
              Sus datos personales pueden ser transferidos y tratados dentro y fuera del país, por personas distintas a 
              Nivex IT. En ese sentido, su información puede ser compartida con:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proveedores de servicios tecnológicos que nos ayudan a operar nuestro sitio web y servicios</li>
              <li>Autoridades competentes cuando sea requerido por ley</li>
              <li>Socios comerciales para la prestación de servicios conjuntos (previa autorización)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Derechos ARCO</h2>
            <p>
              Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones 
              del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en 
              caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros 
              registros o bases de datos cuando considere que la misma no está siendo utilizada conforme a los principios, 
              deberes y obligaciones previstas en la normativa (Cancelación); así como oponerse al uso de sus datos personales 
              para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
            </p>
            <p className="mt-4">
              Para ejercer cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del 
              correo electrónico: <a href="mailto:privacidad@nivex.cloud" className="text-accent hover:underline">privacidad@nivex.cloud</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Revocación del Consentimiento</h2>
            <p>
              Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos 
              personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su 
              solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal requiramos 
              seguir tratando sus datos personales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Uso de Cookies y Tecnologías Similares</h2>
            <p>
              Le informamos que en nuestra página de internet utilizamos cookies, web beacons y otras tecnologías a través 
              de las cuales es posible monitorear su comportamiento como usuario de internet, brindarle un mejor servicio y 
              experiencia de usuario al navegar en nuestra página, así como ofrecerle nuevos productos y servicios basados en 
              sus preferencias.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Modificaciones al Aviso de Privacidad</h2>
            <p>
              Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso 
              de privacidad, para la atención de novedades legislativas, políticas internas o nuevos requerimientos para la 
              prestación u ofrecimiento de nuestros servicios o productos.
            </p>
            <p className="mt-4">
              Estas modificaciones estarán disponibles al público a través de nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Contacto</h2>
            <p>
              Si tiene alguna duda o comentario sobre el presente aviso de privacidad, puede contactarnos en:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> <a href="mailto:privacidad@nivex.cloud" className="text-accent hover:underline">privacidad@nivex.cloud</a></li>
              <li><strong>Teléfono:</strong> <a href="tel:+525611907195" className="text-accent hover:underline">+52 56 1190 7195</a></li>
            </ul>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-center text-muted-foreground">
              Fecha de última actualización: Noviembre 2025
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
