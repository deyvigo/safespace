import { useState, useEffect } from "react";

export default function Buscador({ onBuscar }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      const texto = query.trim();
      if (texto.length >= 3) {
        onBuscar(texto);
      }
    }, 300); // espera 300ms antes de disparar

    return () => clearTimeout(delay); // limpia si el usuario sigue escribiendo
  }, [query, onBuscar]);

  return (
    <input
      type="text"
      placeholder="Buscar recursos, categorias o temas..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border border-gray-300 rounded px-3 py-4 w-2xl text-black mx-5 my-4"
    />
  );
}