import { useAuth } from "@providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

function AdminGuard() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}

export default AdminGuard;
