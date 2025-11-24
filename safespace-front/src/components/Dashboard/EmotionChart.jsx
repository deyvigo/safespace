import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useGetDailyRates from "../../hooks/DailyRate/useGetDailyRates";
import Loader from "../Loader";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow text-gray-600 text-[12px] max-w-[240px]">
        <p>{payload[0].payload.justification}</p>
      </div>
    );
  }
  return null;
};

export default function EmotionChart({weekResume, loadingResume, rates, loadingRates}) {

  return (
    <div className="min-h-[50vh] flex flex-3 flex-col justify-center items-center bg-white border-black border-2 rounded-2xl px-2 py-5 sm:px-5">
      <div className="flex-none mb-5 lg:flex-1 text-center sm:text-left w-full">
        <h2 className="text-blue-950 font-bold text-2xl! sm:text-3xl!">
          Progreso semanal
        </h2>
        <p className="text-gray-400 text-base sm:text-xl">Últimos 7 dias</p>
      </div>
      <div className="flex lg:flex-3 justify-center items-center w-full h-[300px] min-h-[150px] lg:h-full mb-5 sm:mb-0">
        <ResponsiveContainer width="100%" height="100%" minHeight={0}>
          <LineChart data={rates} margin={{ right: 30, left: 20, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="created_at"
              tickFormatter={(value) => {
                const d = new Date(value);
                const dd = String(d.getDate()).padStart(2, "0");
                const mm = String(d.getMonth() + 1).padStart(2, "0");
                const yy = String(d.getFullYear()).slice(-2);
                return `${dd}/${mm}/${yy}`;
              }}
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              width={30}
              domain={[1, 10]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              tickFormatter={(valor) => {
                const emociones = {
                  1: "1",
                  2: "2",
                  3: "3",
                  4: "4",
                  5: "5",
                  6: "6",
                  7: "7",
                  8: "8",
                  9: "9",
                  10: "10",
                };
                return emociones[valor];
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#0092B8"
              strokeWidth={4}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {!loadingResume ? (
        weekResume ? (
          <div className="flex flex-1 text-center items-center">
            <p className="text-gray-400 text-base sm:text-xl">
              <span className="text-cyan-500 font-bold">
                {weekResume.title}
              </span>{" "}
              {weekResume.description}
            </p>
          </div>
        ) : (
          <></>
        )
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 mt-4">
          <Loader className={"w-full h-10"} />
          <p className="text-gray-400">Analizando tu progreso semanal</p>
        </div>
      )}
    </div>
  );
}
