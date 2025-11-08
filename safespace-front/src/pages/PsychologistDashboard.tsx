import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, Calendar, BookOpen, MessageSquare, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const PsychologistDashboard = () => {
  // Datos de ejemplo para alertas
  const alerts = [
    { id: 1, student: "María García", days: 5, emotion: "Triste", priority: "high" },
    { id: 2, student: "Carlos López", days: 3, emotion: "Ansioso", priority: "medium" },
    { id: 3, student: "Ana Torres", days: 4, emotion: "Estresado", priority: "high" },
  ];

  const upcomingSessions = [
    { id: 1, student: "Juan Pérez", time: "10:00 AM", date: "Hoy" },
    { id: 2, student: "Laura Martínez", time: "2:00 PM", date: "Hoy" },
    { id: 3, student: "Pedro Sánchez", time: "11:00 AM", date: "Mañana" },
  ];

  const stats = [
    { label: "Estudiantes activos", value: "45", icon: Users, color: "text-primary" },
    { label: "Alertas pendientes", value: "3", icon: AlertTriangle, color: "text-warning" },
    { label: "Sesiones esta semana", value: "12", icon: Calendar, color: "text-secondary" },
    { label: "Recursos publicados", value: "28", icon: BookOpen, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Panel del Psicólogo</h1>
          <p className="text-muted-foreground">Bienvenido de vuelta, gestiona el bienestar de tus estudiantes</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-3xl bg-gradient-card border-border animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-secondary/10 rounded-2xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Alertas Tempranas */}
          <Card className="rounded-3xl bg-gradient-card border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Alertas Tempranas
                  </CardTitle>
                  <CardDescription>Estudiantes que requieren atención prioritaria</CardDescription>
                </div>
                <Link to="/psicologo/estudiantes">
                  <Button variant="ghost" size="sm" className="rounded-xl">Ver todos</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl hover:bg-background/80 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{alert.student}</p>
                    <p className="text-sm text-muted-foreground">
                      {alert.days} días seguidos - {alert.emotion}
                    </p>
                  </div>
                  <Badge variant={alert.priority === "high" ? "destructive" : "secondary"} className="rounded-xl">
                    {alert.priority === "high" ? "Urgente" : "Moderado"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Próximas Sesiones */}
          <Card className="rounded-3xl bg-gradient-card border-border animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    Próximas Sesiones
                  </CardTitle>
                  <CardDescription>Agenda de hoy y mañana</CardDescription>
                </div>
                <Link to="/psicologo/sesiones">
                  <Button variant="ghost" size="sm" className="rounded-xl">Ver agenda</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl hover:bg-background/80 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{session.student}</p>
                    <p className="text-sm text-muted-foreground">{session.time} - {session.date}</p>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Unirse
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Link to="/psicologo/estudiantes">
            <Card className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-3xl bg-gradient-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">Gestionar Estudiantes</h3>
                  <p className="text-sm text-muted-foreground">Ver progreso y alertas</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/psicologo/sesiones">
            <Card className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-3xl bg-gradient-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-2xl">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">Gestionar Sesiones</h3>
                  <p className="text-sm text-muted-foreground">Agenda y notas terapéuticas</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/psicologo/contenidos">
            <Card className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-3xl bg-gradient-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-2xl">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">Gestionar Contenidos</h3>
                  <p className="text-sm text-muted-foreground">Biblioteca de recursos</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PsychologistDashboard;
