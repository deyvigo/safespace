import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const PAGESIZES = [
  { value: 1, label: 1 },
  { value: 6, label: 6 },
  { value: 10, label: 10 },
  { value: 20, label: 20 },
];

export default function PaginationBar({
  totalPages,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) {
  const [dataBar, setDataBar] = useState(() => {
    if (window.innerWidth > 600 && window.innerWidth <= 1000) {
      return { totalElements: 5, minDivisor: 3 };
    } else if (window.innerWidth <= 600) {
      return { totalElements: 3, minDivisor: 2 };
    } else {
      return { totalElements: 11, minDivisor: 6 };
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && window.innerWidth <= 1000) {
        setDataBar({ totalElements: 5, minDivisor: 3 });
      } else if (window.innerWidth <= 640) {
        setDataBar({ totalElements: 3, minDivisor: 2 });
      } else {
        setDataBar({ totalElements: 11, minDivisor: 6 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const counterElements = Array.from({
    length: Math.min(totalPages, dataBar.totalElements),
  });

  let updater = 0;
  if (currentPage > dataBar.minDivisor && totalPages > dataBar.totalElements) {
    updater =
      currentPage -
      dataBar.minDivisor -
      Math.max(
        0,
        dataBar.totalElements - dataBar.minDivisor - totalPages + currentPage
      );
  }

  return (
    <>
      <div className="w-[200px] mt-7">
        <label htmlFor="selectDrop" className="text-gray-600 text-xl">
          Recursos / Página
        </label>
        <select
          id="selectDrop"
          value={pageSize}
          onChange={(e) => {
            setPageSize(e.target.value), setCurrentPage(0);
          }}
          className="w-[120px] px-4 py-3 border border-gray-300 rounded-lg text-xl  text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        >
          {PAGESIZES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-1 sm:gap-2 items-center w-full justify-center  mt-2 mb-5">
        <div
          onClick={() => setCurrentPage(0)}
          className="text-gray-500 hover:text-black transition-all duration-200 hover:cursor-pointer"
        >
          <ChevronsLeft className="h-13 w-[30px] sm:h-17 sm:w-[50px]" />
        </div>
        <div
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className="text-gray-500 hover:text-black transition-all duration-200 hover:cursor-pointer"
        >
          <ChevronLeft className="h-13 w-[30px] sm:h-17 sm:w-[50px]" />
        </div>
        <div className="flex gap-2">
          {counterElements.map((_, idx) => (
            <div
              onClick={() => setCurrentPage(idx + updater)}
              className={`flex items-center transition-all duration-200 hover:text-black hover:cursor-pointer hover:font-bold text-gray-500 text-2xl sm:text-3xl justify-center h-10 w-[30px] sm:h-15 sm:w-[50px] ${
                idx + updater == currentPage
                  ? "bg-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:text-white"
                  : ""
              }`}
            >
              {idx + updater + 1}
            </div>
          ))}
        </div>
        `
        <div
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.max(totalPages - 1,0)))
          }
          className="text-gray-500 hover:text-black transition-all duration-200 hover:cursor-pointer"
        >
          <ChevronRight className="h-13 w-[30px] sm:h-17 sm:w-[50px]" />
        </div>
        <div
          onClick={() => setCurrentPage(Math.max(totalPages - 1,0))}
          className="text-gray-500 hover:text-black transition-all duration-200 hover:cursor-pointer"
        >
          <ChevronsRight className="h-13 w-[30px] sm:h-17 sm:w-[50px]" />
        </div>
      </div>
    </>
  );
}
