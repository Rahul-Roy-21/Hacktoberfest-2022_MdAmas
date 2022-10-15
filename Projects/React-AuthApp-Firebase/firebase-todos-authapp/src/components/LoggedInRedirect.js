import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";

const LoggedInRedirect = ({ children }) => {
  const { auth } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authState_User) => {
      if (authState_User) {
        navigate("/home");
      }
    });
  });

  return children;
};

export default LoggedInRedirect;
