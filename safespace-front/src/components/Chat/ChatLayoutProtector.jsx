export const ChatLayoutProtector = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 flex-1 flex flex-col overflow-hidden items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 text-center px-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-4">
          <svg 
            className="w-12 h-12 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800">Selecciona una conversación</h3>
        <p className="text-slate-500 max-w-md">
          Elige una conversación de la lista para comenzar a chatear o iniciar una nueva conversación.
        </p>
      </div>
    </div>
  )
}