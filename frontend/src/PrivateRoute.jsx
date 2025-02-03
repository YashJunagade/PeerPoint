import { Navigate } from "react-router-dom";
import { useUser } from "./store/UserContext";

const PrivateRoute = ({ element }) => {
  const { user } = useUser();

  return user ? element : <Navigate to="/signIn" />;
};

export default PrivateRoute;
