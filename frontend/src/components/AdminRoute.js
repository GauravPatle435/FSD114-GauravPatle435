import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  // No token → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user = jwtDecode(token);

  // Not admin → go to dashboard
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin allowed
  return children;
}

export default AdminRoute;