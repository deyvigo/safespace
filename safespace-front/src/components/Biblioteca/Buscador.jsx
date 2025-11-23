import { useState, useEffect } from "react";

export default function Buscador({ onBuscar }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      const texto = query.trim();
      /*       if (texto.length >= 3) {
        onBuscar(texto);
      } */
      onBuscar(texto);
    }, 300); 

    return () => clearTimeout(delay);
  }, [query, onBuscar]);

  return (
    <input
      type="text"
      placeholder="Buscar recursos, categorias o temas..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border border-gray-300 rounded px-3 py-4 w-full text-black mt-2 mb-6"
    />
  );
}
