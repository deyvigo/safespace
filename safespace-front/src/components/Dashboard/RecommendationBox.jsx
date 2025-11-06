export default function RecommendationBox({ icon, title, description }) {
  return (
    <div className="flex flex-row p-4 items-center border-gray-500 border-2 rounded-2xl">
      <div className="">
        {/* icon */}
        <p className="text-5xl m-2">💝</p>
      </div>
      <div className=" m-2">
        <div className="flex flex-1 text-left">
          <p className=" text-blue-950 font-medium">
            Práctica de respiración consciente
          </p>
        </div>
        <div className="text-gray-400 flex justify-start text-left">
          <p>
            Dedica 5 minutos a respirar profundamente. Esto puede ayudarte a
            reducir la ansiedad y mejorar tu concentración.
          </p>
        </div>
      </div>
    </div>
  );
}
