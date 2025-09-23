import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/app/store";
import App from "./App.jsx";
import { bootstrapSession } from "@/features/auth/auth.slice";

//Authgate para poner en marcha el bootstrap al arrancar la app
function AuthGate({ children }) {
  const dispatch = useDispatch();
  const ready = useSelector((s) => s.auth.ready);

  useEffect(() => {
    dispatch(bootstrapSession());
  }, [dispatch]);

  if (!ready) return <div style={{ padding: 24 }}>Cargando…</div>;
  return children;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthGate>
      <App />
    </AuthGate>
  </Provider>
);
