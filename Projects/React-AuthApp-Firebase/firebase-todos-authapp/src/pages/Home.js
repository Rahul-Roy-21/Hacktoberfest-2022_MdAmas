import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { getDate } from "../components/date-fns";
import { useAppContext } from "../App";
import { HiLogout } from "react-icons/hi";
import { RiBookMarkFill } from "react-icons/ri";
import { alertToast } from "../components/toastify";

const HomePage = () => {
  const { auth } = useAppContext();
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });
  }, [auth]);

  const navigate = useNavigate();

  function handleSignOut() {
    signOut(auth)
      .then((res) => {
        alertToast("error", "Logout Successful !!");
        navigate("/");
      })
      .catch((err) => alertToast("error", err.message));
  }

  return (
    <div className="card w-100">
      <div className="card-body">
        <h1 className="card-title">Welcome to Home Page !!</h1>

        {user ? (
          <div>
            <article className="profileSection">
              <h5>
                <div>User Id</div>
                <div>{user.uid}</div>
              </h5>
              <h5>
                <div>UserName</div>
                <div>{user.displayName}</div>
              </h5>
              <h5>
                <div>Email Address</div>
                <div>{user.email}</div>
              </h5>
              <h5>
                <div>Registered</div>
                <div>{getDate(user.metadata.createdAt)}</div>
              </h5>
              <h5>
                <div>Last Login</div>
                <div>{getDate(user.metadata.lastLoginAt)}</div>
              </h5>
            </article>
            <section className="d-grid gap-3 col-9 col-md-7 mx-auto my-3">
              <Link to="/todos" className="btn btn-success">
                Go to Todos <RiBookMarkFill />
              </Link>
              <button onClick={handleSignOut} className="btn btn-danger">
                Sign Out <HiLogout />
              </button>
            </section>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default HomePage;
