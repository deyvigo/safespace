import React from "react";

export default function ActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonClass = "bg-blue-600 hover:bg-blue-700",
  showCancelButton = true,
  isConfirmDisabled = false,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-md text-black shadow-xl flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">{title}</h2>

        <div>{children}</div>

        <div className="flex justify-end gap-4 mt-4">
          {showCancelButton && (
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            className={`text-white px-4 py-2 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
