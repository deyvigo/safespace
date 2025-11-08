import Navbar from "@/components/Navbar";
import EmotionTracker from "@/components/EmotionTracker";
import EmotionChart from "@/components/EmotionChart";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Bell, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Hola, Estudiante</h1>
          </div>
          <p className="text-muted-foreground">¿Cómo te sientes hoy? Registra tu estado emocional.</p>
        </div>

        {/* Alert Card - Example */}
        <Card className="mb-8 p-4 bg-warning/10 border-warning/30 rounded-2xl animate-slide-in-left">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-warning" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Mensaje del sistema</p>
              <p className="text-xs text-muted-foreground">Recuerda que tienes una sesión programada para hoy a las 3:00 PM</p>
            </div>
          </div>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <EmotionTracker />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <EmotionChart />
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <PersonalizedRecommendations />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Link to="/biblioteca">
            <Card className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-3xl bg-gradient-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-2xl">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-1">Biblioteca Digital</h3>
                  <p className="text-sm text-muted-foreground">Explora recursos de bienestar</p>
                </div>
                <Button variant="ghost" className="rounded-xl">
                  Explorar
                </Button>
              </div>
            </Card>
          </Link>

          <Link to="/atencion">
            <Card className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-3xl bg-gradient-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-2xl">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-1">Atención Psicológica</h3>
                  <p className="text-sm text-muted-foreground">Conecta con un especialista</p>
                </div>
                <Button variant="ghost" className="rounded-xl">
                  Contactar
                </Button>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
