import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // ❌ If NOT logged in
  if (!token) {
    return <Navigate to="/" />;
  }

  // ✅ If logged in
  return children;
}