import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoutes = () => {
  const { user } = useAuth();
  console.log("🚀 ~ PrivateRoutes ~ user:", user)
  if (!user) return <Navigate to="/singin" />;
  return <Outlet />;
};

export default PrivateRoutes;
