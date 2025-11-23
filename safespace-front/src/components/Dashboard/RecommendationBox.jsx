export default function RecommendationBox({ icon, title, description }) {
  return (
    <div className="flex flex-row p-2 sm:p-4 items-center border-gray-500 border-2 rounded-2xl">
      <div className="">
        <p className="text-5xl m-1 sm:m-2">{icon}</p>
      </div>
      <div className="m-1 sm:m-2">
        <div className="flex flex-1 text-left">
          <p className=" text-blue-950 font-medium text-base sm:ext-lg">
            {title}
          </p>
        </div>
        <div className="text-gray-400 flex justify-start text-left text-sm sm:text-base">
          <p>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
