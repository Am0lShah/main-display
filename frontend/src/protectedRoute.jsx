import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // Get user from Redu
    //  const user=true;
  return user ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
