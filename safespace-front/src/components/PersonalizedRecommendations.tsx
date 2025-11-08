import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Brain, Coffee, Moon } from "lucide-react";

type Recommendation = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  color: string;
  bgColor: string;
};

const recommendations: Recommendation[] = [
  {
    id: "1",
    icon: <Heart className="w-5 h-5" />,
    title: "Práctica de respiración consciente",
    description: "Dedica 5 minutos a respirar profundamente. Esto puede ayudarte a reducir la ansiedad y mejorar tu concentración.",
    category: "Bienestar",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "2",
    icon: <Coffee className="w-5 h-5" />,
    title: "Toma descansos regulares",
    description: "Cada 50 minutos de estudio, toma un descanso de 10 minutos. Tu mente necesita tiempo para procesar la información.",
    category: "Productividad",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "3",
    icon: <Moon className="w-5 h-5" />,
    title: "Establece una rutina de sueño",
    description: "Intenta dormir entre 7-8 horas. Un buen descanso es fundamental para tu salud emocional y rendimiento académico.",
    category: "Salud",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "4",
    icon: <Brain className="w-5 h-5" />,
    title: "Conexión social",
    description: "Mantén contacto con amigos y familiares. Las conexiones sociales fortalecen tu bienestar emocional.",
    category: "Social",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const PersonalizedRecommendations = () => {
  return (
    <Card className="p-6 shadow-medium rounded-3xl bg-gradient-card border-border">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Recomendaciones para ti</h3>
            <p className="text-sm text-muted-foreground">Consejos personalizados basados en tu estado emocional</p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={recommendation.id}
              className="p-4 rounded-2xl border border-border bg-background/50 hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className={`${recommendation.bgColor} ${recommendation.color} p-3 rounded-xl h-fit`}>
                  {recommendation.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{recommendation.title}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {recommendation.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {recommendation.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PersonalizedRecommendations;
