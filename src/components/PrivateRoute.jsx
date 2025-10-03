import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoadingCar } from "./common/LoadingCar";

export default function PrivateRoute({ children }) {
  const { user, ready } = useSelector((state) => state.auth);

  if (!ready) {
    return <LoadingCar />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}