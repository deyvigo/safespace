export default function EmotionBox({ emotion, icon, selected, onToggle }) {
  return (
    <div className="">
      <button
        className="w-20 h-18 sm:w-30 sm:h-25 text-[12px] font-bold sm:text-base sm:p-2.5 sm:m-[5px]"
        type="button"
        onClick={onToggle}
        style={{
          backgroundColor: selected ? "oklch(80.9% 0.105 251.813)" : "#b2b2b2",
          border: selected ? "2px solid #007bff" : "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <h1>{icon}</h1>
        <p>{emotion}</p>
      </button>
    </div>
  );
}
