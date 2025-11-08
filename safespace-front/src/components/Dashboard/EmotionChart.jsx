import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { fecha: "2025-11-01", emocion: "Feliz", valor: 4 },
  { fecha: "2025-11-02", emocion: "Triste", valor: 1 },
  { fecha: "2025-11-03", emocion: "Motivado", valor: 5 },
  { fecha: "2025-11-04", emocion: "Enojado", valor: 2 },
];

export default function EmotionChart() {
  return (
    <div className="flex flex-3 flex-col justify-center items-center bg-white border-black border-2 rounded-2xl p-5 ml-5">
      <div className="flex-1">
        <h2 className="text-blue-950">Progreso semanal</h2>
        <p className="text-gray-400 text-center">Últimos 7 dias</p>
      </div>
      <div className="flex flex-3 justify-center items-center w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{right: 30, left: 20, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(valor) => {
                const emociones = {
                  1: "1",
                  2: "2",
                  3: "3",
                  4: "4",
                  5: "5",
                };
                return emociones[valor];
              }}
            />
            <Tooltip
              formatter={(value) => {
                const emociones = {
                  1: "Triste",
                  2: "Enojado",
                  3: "Ansioso",
                  4: "Feliz",
                  5: "Motivado",
                };
                return emociones[value];
              }}
              labelFormatter={(label) => `Fecha: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#b2b2b2"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1">
        <p className="text-gray-400">
          Tendencia positiva! Has mantenido un buen estado emocional esta
          semana.
        </p>
      </div>
    </div>
  );
}
