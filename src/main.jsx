import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store";
import App from "./App.jsx";
import { bootstrapSession } from "./features/auth/authSlice";
import { LoadingCar } from "./components/common/LoadingCar.jsx";

function AuthGate({ children }) {
  const dispatch = useDispatch();
  const ready = useSelector((s) => s.auth.ready);

  useEffect(() => {
    dispatch(bootstrapSession());
  }, [dispatch]);

  if (!ready) return <LoadingCar />;
  return children;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthGate>
      <App />
    </AuthGate>
  </Provider>
);
