import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { signedIn } = useContext(CurrentUserContext);

  const location = useLocation();

  if (!signedIn) return <Navigate to="/login" from={location} />;
  return children;
}
