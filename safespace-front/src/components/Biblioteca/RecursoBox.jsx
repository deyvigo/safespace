import Carousel from "../Carousel/Carousel";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function RecursoBox({ recurso }) {
  const [isFavorite, setFavorite] = useState(false);
  const linkImages = recurso.images.map((el) => el.public_url);
  if (linkImages.length == 0) {
    linkImages.push("psicoPlaceholder.webp");
  }

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between border-2 h-full border-gray-400 rounded-2xl p-3 sm:p-5 ">
        <div className="flex text-2xl flex-row items-center justify-between ">
          <p>📽️{/* icon */}</p>
          <Heart
            onClick={() => setFavorite((prev) => !prev)}
            size={25}
            color="#AD574B"
            fill={isFavorite ? "#AD574B" : "none"}
            className="hover:cursor-pointer"
          />
        </div>
        <a
          href={recurso?.link}
          target="_blank"
          rel="noopener noreferrer"
          className="contents"
        >
          <div className="flex flex-col justify-center flex-1 gap-2 mb-3 mt-2">
            <h1 className="text-blue-950 text-xl! sm:text-2xl! lg:text-3xl! text-wrap overflow-hidden">
              {recurso?.title}
            </h1>
            <p className="text-gray-400 flex-1 text-base sm:text-lg text-wrap overflow-hidden">
              {recurso?.description}
            </p>
          </div>
          <Carousel images={linkImages} interval={3000} />
          <div className="flex flex-row items-end mt-3 gap-2">
            <div className="border-2 border-gray-400 rounded-full p-2 px-4">
              <p className="text-blue-600">{recurso?.category}</p>
            </div>

            <div className="border-2 border-gray-400 rounded-full p-2 px-4">
              <p className="text-blue-600">{recurso?.type}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
