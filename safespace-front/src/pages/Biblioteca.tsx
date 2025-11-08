import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Video, FileText, Search, Heart } from "lucide-react";

type Resource = {
  id: number;
  title: string;
  description: string;
  type: "articulo" | "video" | "guia";
  category: string;
  readTime?: string;
  duration?: string;
};

const resources: Resource[] = [
  {
    id: 1,
    title: "Técnicas de respiración para la ansiedad",
    description: "Aprende ejercicios simples de respiración que te ayudarán a manejar momentos de ansiedad.",
    type: "articulo",
    category: "Ansiedad",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Mindfulness para estudiantes",
    description: "Video guiado de meditación diseñado especialmente para el estrés académico.",
    type: "video",
    category: "Mindfulness",
    duration: "10 min",
  },
  {
    id: 3,
    title: "Guía de manejo del estrés",
    description: "Estrategias prácticas para identificar y gestionar el estrés en tu vida diaria.",
    type: "guia",
    category: "Estrés",
    readTime: "15 min",
  },
  {
    id: 4,
    title: "Construyendo autoestima saludable",
    description: "Ejercicios y reflexiones para fortalecer tu confianza y valoración personal.",
    type: "articulo",
    category: "Autoestima",
    readTime: "8 min",
  },
  {
    id: 5,
    title: "Hábitos de sueño saludables",
    description: "Mejora tu calidad de sueño con estas recomendaciones basadas en evidencia.",
    type: "guia",
    category: "Bienestar",
    readTime: "12 min",
  },
  {
    id: 6,
    title: "Manejo de emociones difíciles",
    description: "Video educativo sobre cómo reconocer y procesar emociones intensas de manera saludable.",
    type: "video",
    category: "Emociones",
    duration: "15 min",
  },
];

const Biblioteca = () => {
  const getIcon = (type: Resource["type"]) => {
    switch (type) {
      case "articulo":
        return <FileText className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "guia":
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Resource["type"]) => {
    switch (type) {
      case "articulo":
        return "bg-primary/10 text-primary";
      case "video":
        return "bg-accent/10 text-accent";
      case "guia":
        return "bg-secondary/10 text-secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Biblioteca Digital</h1>
          </div>
          <p className="text-muted-foreground">
            Recursos validados por profesionales para tu bienestar emocional
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar recursos, categorías o temas..."
              className="pl-12 h-14 rounded-2xl shadow-soft border-border"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {["Todos", "Ansiedad", "Estrés", "Mindfulness", "Autoestima", "Bienestar", "Emociones"].map((category) => (
            <Badge
              key={category}
              variant={category === "Todos" ? "default" : "outline"}
              className={`px-4 py-2 rounded-xl cursor-pointer transition-all ${
                category === "Todos"
                  ? "bg-primary text-primary-foreground hover:bg-primary-dark"
                  : "hover:bg-primary/10 hover:text-primary hover:border-primary"
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card
              key={resource.id}
              className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-3xl bg-gradient-card border-border animate-fade-in"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl ${getTypeColor(resource.type)}`}>
                    {getIcon(resource.type)}
                  </div>
                  <button className="p-2 hover:bg-muted rounded-xl transition-colors">
                    <Heart className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-foreground line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="rounded-lg">
                    {resource.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {resource.readTime || resource.duration}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Biblioteca;
