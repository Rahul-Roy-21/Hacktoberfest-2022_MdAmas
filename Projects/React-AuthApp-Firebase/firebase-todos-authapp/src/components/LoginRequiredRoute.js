import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";

const LoginRequiredRoute = ({ children }) => {
  const { auth } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authState_User) => {
      if (!authState_User) {
        navigate("/");
      }
    });
  });
  return children;
};

export default LoginRequiredRoute;
