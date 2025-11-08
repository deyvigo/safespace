import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Video, FileText, CheckCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SessionManagement = () => {
  const pendingSessions = [
    {
      id: 1,
      student: "María García",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Primera consulta",
      status: "pending",
    },
    {
      id: 2,
      student: "Carlos López",
      date: "2024-01-15",
      time: "2:00 PM",
      type: "Seguimiento",
      status: "pending",
    },
  ];

  const todaySessions = [
    {
      id: 3,
      student: "Juan Pérez",
      time: "10:00 AM",
      type: "Seguimiento",
      status: "confirmed",
    },
    {
      id: 4,
      student: "Laura Martínez",
      time: "2:00 PM",
      type: "Primera consulta",
      status: "confirmed",
    },
  ];

  const completedSessions = [
    {
      id: 5,
      student: "Ana Torres",
      date: "2024-01-10",
      time: "11:00 AM",
      notes: "Sesión productiva. Se observa mejoría en el manejo de ansiedad.",
      status: "completed",
    },
    {
      id: 6,
      student: "Pedro Sánchez",
      date: "2024-01-09",
      time: "3:00 PM",
      notes: "Primera sesión. Identificados factores estresantes principales.",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Gestión de Sesiones</h1>
          <p className="text-muted-foreground">Administra tu agenda y registra notas terapéuticas</p>
        </div>

        <Tabs defaultValue="today" className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <TabsList className="mb-6 rounded-2xl">
            <TabsTrigger value="today" className="rounded-xl">Hoy</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-xl">Pendientes</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-xl">Completadas</TabsTrigger>
          </TabsList>

          {/* Today's Sessions */}
          <TabsContent value="today" className="space-y-6">
            {todaySessions.map((session) => (
              <Card key={session.id} className="rounded-3xl bg-gradient-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {session.student}
                        <Badge className="rounded-xl bg-green-500/20 text-green-700 border-green-500/30">
                          Confirmada
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4" />
                        {session.time} - {session.type}
                      </CardDescription>
                    </div>
                    <Button className="rounded-xl">
                      <Video className="w-4 h-4 mr-2" />
                      Unirse ahora
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Notas de la sesión
                      </label>
                      <Textarea
                        placeholder="Registra las observaciones y progreso del estudiante..."
                        className="rounded-2xl bg-background/50 border-border min-h-[100px]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1 rounded-xl">
                        <FileText className="w-4 h-4 mr-2" />
                        Guardar notas
                      </Button>
                      <Button variant="outline" className="rounded-xl">
                        Ver historial
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Pending Sessions */}
          <TabsContent value="pending" className="space-y-6">
            {pendingSessions.map((session) => (
              <Card key={session.id} className="rounded-3xl bg-gradient-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {session.student}
                        <Badge variant="secondary" className="rounded-xl">
                          Pendiente
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(session.date).toLocaleDateString('es-ES', { 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.time}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button className="flex-1 rounded-xl">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirmar
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl">
                      Reprogramar
                    </Button>
                    <Button variant="destructive" className="rounded-xl">
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Sessions */}
          <TabsContent value="completed" className="space-y-6">
            {completedSessions.map((session) => (
              <Card key={session.id} className="rounded-3xl bg-gradient-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {session.student}
                        <Badge className="rounded-xl bg-primary/20 text-primary border-primary/30">
                          Completada
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(session.date).toLocaleDateString('es-ES', { 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.time}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Notas registradas
                      </label>
                      <div className="p-4 bg-background/50 rounded-2xl border border-border">
                        <p className="text-sm text-foreground">{session.notes}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full rounded-xl">
                      <FileText className="w-4 h-4 mr-2" />
                      Ver historial completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SessionManagement;
