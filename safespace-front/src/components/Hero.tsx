import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full shadow-soft border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Tu bienestar importa</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Bienvenido a{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-primary-foreground/80">
              SafeSpace
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Tu espacio seguro para el bienestar emocional. Acompañamiento psicológico profesional diseñado para estudiantes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/auth">
              <Button size="lg" className="bg-card text-primary hover:bg-card/90 shadow-medium px-8 py-6 text-lg rounded-2xl">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg rounded-2xl">
                Demo Estudiante
              </Button>
            </Link>
            <Link to="/psicologo">
              <Button variant="outline" size="lg" className="border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg rounded-2xl">
                Demo Psicólogo
              </Button>
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-primary" />}
              title="Seguimiento Emocional"
              description="Registra tu estado de ánimo diariamente y visualiza tu progreso"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-accent" />}
              title="Atención Profesional"
              description="Conecta con psicólogos especializados de forma segura"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-secondary" />}
              title="Recursos Validados"
              description="Accede a contenido curado por expertos en salud mental"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft border border-border hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="p-3 bg-gradient-calm rounded-2xl">{icon}</div>
        <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Hero;
