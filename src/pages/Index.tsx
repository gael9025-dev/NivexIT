import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Methodology from "@/components/Methodology";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import Chatbot from "@/components/Chatbot"; // TODO: Reactivar cuando Firebase Functions esté funcionando correctamente

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Experience />
      <Methodology />
      <About />
      <Contact />
      <Footer />
      {/* <Chatbot /> */} {/* TODO: Reactivar cuando Firebase Functions esté funcionando correctamente */}
    </div>
  );
};

export default Index;
