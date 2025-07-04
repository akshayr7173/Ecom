import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
export default function AuthGuard({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}