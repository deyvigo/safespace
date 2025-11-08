import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Calendar, Clock, Video, User } from "lucide-react";

const Atencion = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Atención Psicológica</h1>
          </div>
          <p className="text-muted-foreground">Conecta con profesionales de salud mental especializados</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chat Section */}
            <Card className="p-6 rounded-3xl shadow-medium bg-gradient-card border-border animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Chat en línea</h2>
                    <p className="text-sm text-muted-foreground">Conversación segura y confidencial</p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">No hay conversaciones activas</p>
                    <Button className="rounded-xl">Iniciar chat con psicólogo</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="p-6 rounded-3xl shadow-medium bg-gradient-card border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-accent/10 rounded-2xl">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Próximas sesiones</h2>
                      <p className="text-sm text-muted-foreground">Tus citas programadas</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl">
                    Agendar nueva
                  </Button>
                </div>

                {/* Example Session */}
                <div className="space-y-3">
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary/20 text-primary rounded-lg">Confirmada</Badge>
                          <span className="text-sm text-muted-foreground">Hoy, 15:00</span>
                        </div>
                        <h3 className="font-semibold text-foreground">Sesión individual</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>Dra. María González</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>50 minutos</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Video className="w-4 h-4 mr-2" />
                        Unirse
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Psychologist Info */}
            <Card className="p-6 rounded-3xl shadow-medium bg-gradient-card border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-foreground">Tu psicólogo asignado</h3>
                
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xl font-bold">
                    MG
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Dra. María González</p>
                    <p className="text-sm text-muted-foreground">Psicóloga Clínica</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse-soft"></div>
                    <span className="text-sm text-muted-foreground">Disponible ahora</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Especializada en ansiedad, estrés académico y desarrollo personal.
                  </p>
                </div>

                <Button className="w-full rounded-xl">Contactar ahora</Button>
              </div>
            </Card>

            {/* Emergency Help */}
            <Card className="p-6 rounded-3xl shadow-medium bg-warning/5 border-warning/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">¿Necesitas ayuda urgente?</h3>
                <p className="text-sm text-muted-foreground">
                  Si te encuentras en crisis, estos recursos están disponibles 24/7:
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full rounded-xl justify-start border-warning/30 hover:bg-warning/10">
                    <span className="font-semibold">Línea de crisis</span>
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl justify-start border-warning/30 hover:bg-warning/10">
                    <span className="font-semibold">Chat de emergencia</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Atencion;
