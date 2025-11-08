import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smile, Meh, Frown, Heart, Cloud, Sun, CloudRain } from "lucide-react";

type Emotion = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
};

const emotions: Emotion[] = [
  {
    id: "feliz",
    label: "Feliz",
    icon: <Sun className="w-8 h-8" />,
    color: "text-success",
    bgColor: "bg-success/10 hover:bg-success/20",
  },
  {
    id: "tranquilo",
    label: "Tranquilo",
    icon: <Smile className="w-8 h-8" />,
    color: "text-primary",
    bgColor: "bg-primary/10 hover:bg-primary/20",
  },
  {
    id: "neutral",
    label: "Neutral",
    icon: <Meh className="w-8 h-8" />,
    color: "text-muted-foreground",
    bgColor: "bg-muted hover:bg-muted/80",
  },
  {
    id: "estresado",
    label: "Estresado",
    icon: <Cloud className="w-8 h-8" />,
    color: "text-warning",
    bgColor: "bg-warning/10 hover:bg-warning/20",
  },
  {
    id: "ansioso",
    label: "Ansioso",
    icon: <CloudRain className="w-8 h-8" />,
    color: "text-warning",
    bgColor: "bg-warning/10 hover:bg-warning/20",
  },
  {
    id: "triste",
    label: "Triste",
    icon: <Frown className="w-8 h-8" />,
    color: "text-secondary",
    bgColor: "bg-secondary/10 hover:bg-secondary/20",
  },
];

const EmotionTracker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedEmotion) {
      // Aquí iría la lógica para guardar la emoción
      console.log("Emoción registrada:", selectedEmotion);
    }
  };

  return (
    <Card className="p-6 shadow-medium rounded-3xl bg-gradient-card border-border">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-2">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">¿Cómo te sientes hoy?</h3>
          <p className="text-muted-foreground">Selecciona tu estado emocional actual</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {emotions.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => setSelectedEmotion(emotion.id)}
              className={`
                ${emotion.bgColor} ${emotion.color}
                p-6 rounded-2xl border-2 transition-all duration-300
                ${
                  selectedEmotion === emotion.id
                    ? "border-primary scale-105 shadow-medium"
                    : "border-transparent hover:scale-105"
                }
              `}
            >
              <div className="flex flex-col items-center gap-2">
                {emotion.icon}
                <span className="font-medium text-sm">{emotion.label}</span>
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!selectedEmotion}
          className="w-full rounded-xl py-6 text-base shadow-medium"
        >
          Registrar estado emocional
        </Button>
      </div>
    </Card>
  );
};

export default EmotionTracker;
