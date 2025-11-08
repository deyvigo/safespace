import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";

// Datos de ejemplo para la gráfica
const mockData = [
  { day: "Lun", mood: 4 },
  { day: "Mar", mood: 5 },
  { day: "Mié", mood: 3 },
  { day: "Jue", mood: 4 },
  { day: "Vie", mood: 5 },
  { day: "Sáb", mood: 4 },
  { day: "Dom", mood: 4 },
];

const EmotionChart = () => {
  const maxMood = 5;

  return (
    <Card className="p-6 shadow-medium rounded-3xl bg-gradient-card border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Tu Progreso Semanal</h3>
              <p className="text-sm text-muted-foreground">Últimos 7 días</p>
            </div>
          </div>
          <button className="p-2 hover:bg-muted rounded-xl transition-colors">
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Simple bar chart */}
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-2 h-48">
            {mockData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-full">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-xl transition-all duration-500 hover:opacity-80"
                    style={{ height: `${(data.mood / maxMood) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{data.day}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-xs text-muted-foreground">Muy bien</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs text-muted-foreground">Bien</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-xs text-muted-foreground">Necesita atención</span>
            </div>
          </div>
        </div>

        <div className="bg-accent/5 rounded-2xl p-4 border border-accent/20">
          <p className="text-sm text-center text-foreground">
            <span className="font-semibold text-accent">Tendencia positiva!</span> Has mantenido un buen estado
            emocional esta semana.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmotionChart;
