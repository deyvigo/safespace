import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingDown, AlertTriangle, Smile, Filter, Eye } from "lucide-react";

const StudentManagement = () => {
  const students = [
    {
      id: 1,
      name: "María García",
      email: "maria@universidad.edu",
      status: "alert",
      lastEmotion: "Triste",
      consecutiveDays: 5,
      trend: "down",
    },
    {
      id: 2,
      name: "Carlos López",
      email: "carlos@universidad.edu",
      status: "warning",
      lastEmotion: "Ansioso",
      consecutiveDays: 3,
      trend: "down",
    },
    {
      id: 3,
      name: "Laura Martínez",
      email: "laura@universidad.edu",
      status: "good",
      lastEmotion: "Feliz",
      consecutiveDays: 0,
      trend: "up",
    },
    {
      id: 4,
      name: "Juan Pérez",
      email: "juan@universidad.edu",
      status: "good",
      lastEmotion: "Tranquilo",
      consecutiveDays: 0,
      trend: "stable",
    },
    {
      id: 5,
      name: "Ana Torres",
      email: "ana@universidad.edu",
      status: "alert",
      lastEmotion: "Estresado",
      consecutiveDays: 4,
      trend: "down",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "alert":
        return <Badge variant="destructive" className="rounded-xl">Alerta</Badge>;
      case "warning":
        return <Badge variant="secondary" className="rounded-xl bg-warning/20 text-warning border-warning/30">Atención</Badge>;
      case "good":
        return <Badge className="rounded-xl bg-green-500/20 text-green-700 border-green-500/30">Bien</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
    if (trend === "up") return <Smile className="w-4 h-4 text-green-500" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Gestión de Estudiantes</h1>
          <p className="text-muted-foreground">Monitorea el bienestar emocional y patrones de tus estudiantes</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 rounded-3xl bg-gradient-card border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar estudiante por nombre o email..."
                  className="pl-10 rounded-2xl bg-background/50 border-border"
                />
              </div>
              <Button variant="outline" className="rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <TabsList className="mb-6 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl">Todos</TabsTrigger>
            <TabsTrigger value="alerts" className="rounded-xl">Alertas</TabsTrigger>
            <TabsTrigger value="good" className="rounded-xl">Estables</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {students.map((student) => (
              <Card key={student.id} className="rounded-3xl bg-gradient-card border-border hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-lg">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          {getStatusBadge(student.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Última emoción</p>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{student.lastEmotion}</p>
                          {getTrendIcon(student.trend)}
                        </div>
                      </div>

                      {student.consecutiveDays > 0 && (
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Días seguidos</p>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-destructive">{student.consecutiveDays}</p>
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                          </div>
                        </div>
                      )}

                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            {students.filter(s => s.status === "alert" || s.status === "warning").map((student) => (
              <Card key={student.id} className="rounded-3xl bg-gradient-card border-border hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-lg">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          {getStatusBadge(student.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Última emoción</p>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{student.lastEmotion}</p>
                          {getTrendIcon(student.trend)}
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Días seguidos</p>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-destructive">{student.consecutiveDays}</p>
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="good" className="space-y-4">
            {students.filter(s => s.status === "good").map((student) => (
              <Card key={student.id} className="rounded-3xl bg-gradient-card border-border hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-lg">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          {getStatusBadge(student.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Última emoción</p>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{student.lastEmotion}</p>
                          {getTrendIcon(student.trend)}
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver perfil
                      </Button>
                    </div>
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

export default StudentManagement;
