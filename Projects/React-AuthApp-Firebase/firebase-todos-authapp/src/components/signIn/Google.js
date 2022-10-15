import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import { FcGoogle } from "react-icons/fc";

const Google = () => {
  const { auth } = useAppContext();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  function handleGoogleSignIn() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className="googleBtn btn d-flex justify-content-center align-items-center"
    >
      <FcGoogle
        style={{
          fontSize: "2rem",
          background: "#fff",
          padding: "3px",
          margin: "0 0.7rem",
        }}
      />
      <>Sign in with Google</>
    </button>
  );
};

export default Google;
