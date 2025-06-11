import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: "", show: false });

  const showToast = (message) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: "", show: false }), 2000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast.show && (
        <div className="custom-toast">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}