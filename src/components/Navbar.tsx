import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, CloudCog, Hexagon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={handleLogoClick}>
            <div className="relative">
              <Hexagon className="w-8 h-8 text-accent fill-accent/10 transition-all group-hover:rotate-180 duration-500" />
              <CloudCog className="w-4 h-4 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-bold text-gradient">Nivex IT</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-foreground hover:text-accent transition-colors font-medium"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("metodologia")}
              className="text-foreground hover:text-accent transition-colors font-medium"
            >
              Metodología
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="text-foreground hover:text-accent transition-colors font-medium"
            >
              Nosotros
            </button>
            <Button
              variant="hero"
              size="sm"
              onClick={() => scrollToSection("contacto")}
            >
              Contacto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-background/95 backdrop-blur-lg rounded-lg mt-2 border border-border shadow-lg animate-fade-in">
            <div className="flex flex-col gap-4 px-4">
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-foreground hover:text-accent transition-colors font-medium text-left py-2"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("metodologia")}
                className="text-foreground hover:text-accent transition-colors font-medium text-left py-2"
              >
                Metodología
              </button>
              <button
                onClick={() => scrollToSection("nosotros")}
                className="text-foreground hover:text-accent transition-colors font-medium text-left py-2"
              >
                Nosotros
              </button>
              <Button
                variant="hero"
                size="sm"
                onClick={() => scrollToSection("contacto")}
                className="w-full"
              >
                Contacto
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
