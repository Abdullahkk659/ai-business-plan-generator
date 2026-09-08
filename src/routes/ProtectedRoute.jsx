import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  // if not logged in, redirect to login; otherwise show the page
  return currentUser ? children : <Navigate to="/login" />;
}