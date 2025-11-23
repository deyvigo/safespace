import React from "react";

export default function RecursoBox({ recurso }) {
  return (
    <a href={recurso?.link} target="_blank" rel="noopener noreferrer" className="h-full">
      <div className="flex flex-col gap-y-6 justify-between border-2 h-full border-gray-400 rounded-2xl p-3 sm:p-5 ">
        <div className="flex flex-row items-start justify-between ">
          <p>📽️{/* icon */}</p>
          <p>♥️{/* icon favorito */}</p>
        </div>
        <div className="flex flex-col justify-center flex-1 gap-2">
          <h1 className="text-blue-950 flex-1 text-xl! sm:text-2xl! lg:text-3xl! ">{recurso?.title}</h1>
          <p className="text-gray-400 flex-1 text-base sm:text-lg">{recurso?.description}</p>
        </div>
        <div className="flex flex-1 flex-row items-end">
          <div className="flex flex-row gap-1 flex-1 justify-start flex-wrap">
            <div className="border-2 border-gray-400 rounded-full p-2">
              <p className="text-blue-600">{recurso?.category}</p>
            </div>
          </div>
          {/*  <div>
            <p className="text-gray-400">{recurso?.time} min</p>
          </div> */}
        </div>
      </div>
    </a>
  );
}
