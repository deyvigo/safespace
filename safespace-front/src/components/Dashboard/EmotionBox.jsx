export default function EmotionBox({ emotion, icon, selected, onToggle }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        style={{
          backgroundColor: selected ? "oklch(80.9% 0.105 251.813)" : "#b2b2b2",
          border: selected ? "2px solid #007bff" : "1px solid #ccc",
          padding: "10px",
          margin: "5px",
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
