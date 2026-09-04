import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// =====================================================
// ADMIN ROUTE
// =====================================================
// Guards admin-only pages. Must be nested inside
// <ProtectedRoute /> so `user` is already loaded.
//
// Access rule mirrors the backend's requireRole()
// middleware (see middleware/rbacMiddleware.js):
// only "admin" or "super_admin" may pass.
// =====================================================

const ADMIN_ROLES = ["admin", "super_admin"];

const AdminRoute = () => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const isAdmin = !!user?.role && ADMIN_ROLES.includes(user.role);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AdminRoute;