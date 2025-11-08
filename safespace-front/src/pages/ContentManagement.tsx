import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, FileText, Video, BookOpen, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentManagement = () => {
  const resources = [
    {
      id: 1,
      title: "Técnicas de respiración para reducir la ansiedad",
      category: "Ansiedad",
      type: "article",
      status: "published",
      views: 145,
      date: "2024-01-10",
    },
    {
      id: 2,
      title: "Guía práctica: Gestión del estrés académico",
      category: "Estrés",
      type: "guide",
      status: "published",
      views: 203,
      date: "2024-01-08",
    },
    {
      id: 3,
      title: "Meditación guiada para principiantes",
      category: "Mindfulness",
      type: "video",
      status: "draft",
      views: 0,
      date: "2024-01-12",
    },
    {
      id: 4,
      title: "Construyendo hábitos saludables",
      category: "Bienestar",
      type: "article",
      status: "published",
      views: 178,
      date: "2024-01-05",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "guide":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "article":
        return "Artículo";
      case "video":
        return "Video";
      case "guide":
        return "Guía";
      default:
        return "Artículo";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Gestión de Contenidos</h1>
            <p className="text-muted-foreground">Administra la biblioteca de recursos de bienestar</p>
          </div>
          <Button className="rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Crear recurso
          </Button>
        </div>

        <Tabs defaultValue="all" className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <TabsList className="mb-6 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl">Todos</TabsTrigger>
            <TabsTrigger value="published" className="rounded-xl">Publicados</TabsTrigger>
            <TabsTrigger value="draft" className="rounded-xl">Borradores</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="rounded-3xl bg-gradient-card border-border hover:shadow-medium transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{resource.title}</h3>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline" className="rounded-xl">
                              {resource.category}
                            </Badge>
                            <Badge variant="outline" className="rounded-xl">
                              {getTypeLabel(resource.type)}
                            </Badge>
                            {resource.status === "published" ? (
                              <Badge className="rounded-xl bg-green-500/20 text-green-700 border-green-500/30">
                                Publicado
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="rounded-xl">
                                Borrador
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {resource.views} vistas
                            </span>
                            <span>
                              {new Date(resource.date).toLocaleDateString('es-ES', { 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" className="rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="published" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {resources.filter(r => r.status === "published").map((resource) => (
                <Card key={resource.id} className="rounded-3xl bg-gradient-card border-border hover:shadow-medium transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{resource.title}</h3>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline" className="rounded-xl">
                              {resource.category}
                            </Badge>
                            <Badge variant="outline" className="rounded-xl">
                              {getTypeLabel(resource.type)}
                            </Badge>
                            <Badge className="rounded-xl bg-green-500/20 text-green-700 border-green-500/30">
                              Publicado
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {resource.views} vistas
                            </span>
                            <span>
                              {new Date(resource.date).toLocaleDateString('es-ES', { 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" className="rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="draft" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {resources.filter(r => r.status === "draft").map((resource) => (
                <Card key={resource.id} className="rounded-3xl bg-gradient-card border-border hover:shadow-medium transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{resource.title}</h3>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline" className="rounded-xl">
                              {resource.category}
                            </Badge>
                            <Badge variant="outline" className="rounded-xl">
                              {getTypeLabel(resource.type)}
                            </Badge>
                            <Badge variant="secondary" className="rounded-xl">
                              Borrador
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>
                              Creado el {new Date(resource.date).toLocaleDateString('es-ES', { 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="rounded-xl">
                          Publicar
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" className="rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ContentManagement;
