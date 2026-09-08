import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import NewPlan from "./pages/NewPlan";
import PlanView from "./pages/PlanView";
import { isDemoMode } from "./demo";

// In demo mode there's no auth — routes pass through. Otherwise they're protected.
function MaybeProtected({ children }) {
  if (isDemoMode) return children;
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<MaybeProtected><Dashboard /></MaybeProtected>} />
          <Route path="/new-plan" element={<MaybeProtected><NewPlan /></MaybeProtected>} />
          <Route path="/plan/:id" element={<MaybeProtected><PlanView /></MaybeProtected>} />
          <Route path="*" element={<Navigate to={isDemoMode ? "/dashboard" : "/login"} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}