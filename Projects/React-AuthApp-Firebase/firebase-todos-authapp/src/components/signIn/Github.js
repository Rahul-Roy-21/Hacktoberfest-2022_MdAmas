import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import { AiFillGithub } from "react-icons/ai";

const Github = () => {
  const { auth } = useAppContext();
  const provider = new GithubAuthProvider();
  const navigate = useNavigate();

  function handleGithubSignIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <button
      onClick={handleGithubSignIn}
      className="btn btn-dark d-flex justify-content-center align-items-center"
    >
      <AiFillGithub
        style={{ fontSize: "2.2rem", padding: "3px", margin: "0 0.5rem" }}
      />
      Sign in with Github
    </button>
  );
};

export default Github;
