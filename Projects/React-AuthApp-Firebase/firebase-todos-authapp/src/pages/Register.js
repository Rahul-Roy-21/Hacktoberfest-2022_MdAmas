import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "../components/signIn/Google";
import GithubSignIn from "../components/signIn/Github";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAppContext } from "../App";
import { alertToast } from "../components/toastify";
import { GrLogin } from "react-icons/gr";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPwd: false,
  });

  const { auth } = useAppContext();
  const navigate = useNavigate();

  const handleChangedInput = (e) => {
    const targetElem = e.target;

    if (targetElem.name === "showPwd") {
      setForm({ ...form, showPwd: !form.showPwd });
    } else {
      setForm({ ...form, [targetElem.name]: targetElem.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.email ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    ) {
      alertToast("error", "All Fields are Required !!");
    } else if (form.password !== form.confirmPassword) {
      alertToast("error", "Passwords Didn't Match");
    } else {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredentials) => {
          alertToast("success", "Registration Successful, Logging in.. ");

          updateProfile(auth.currentUser, {
            displayName: form.username,
          })
            .then((updateRes) => {
              navigate("/home");
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          alertToast("error", err.message);
        });
    }
  };

  return (
    <div
      className="card w-100"
      style={{ maxWidth: "600px", maxHeight: "95vh" }}
    >
      <div className="card-body">
        <h1 className="card-title">Register</h1>
        <form onSubmit={handleSubmit}>
          <p className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              UserName
            </label>
            <input
              type="text"
              name="username"
              id="nameInput"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChangedInput}
              className="form-control"
            />
          </p>
          <p className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="emailInput"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChangedInput}
              autoComplete="off"
              autoFocus="on"
            />
          </p>
          <p className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type={form.showPwd ? "text" : "password"}
              name="password"
              className="form-control"
              id="passwordInput"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChangedInput}
            />
          </p>
          <p>
            <label htmlFor="confirmPasswordInput" className="form-label">
              Confirm Password
            </label>
            <input
              type={form.showPwd ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              id="confirmPasswordInput"
              placeholder="Re-Enter Password"
              value={form.confirmPassword}
              onChange={handleChangedInput}
            />
          </p>
          <p className="mb-3 form-check">
            <input
              type="checkbox"
              name="showPwd"
              id="checkbox1"
              className="form-check-input"
              checked={form.showPwd}
              onChange={handleChangedInput}
            />
            <label htmlFor="checkbox1" className="form-check-label">{`${
              form.showPwd ? "Hide" : "Show"
            } Password`}</label>
          </p>

          <section className="d-grid gap-3 col-9 mx-auto my-3">
            <button type="submit" className="btn btn-primary">
              Register <GrLogin style={{ fontSize: "1.4rem" }} />
            </button>
          </section>
        </form>

        <section className="d-grid gap-3 col-9 mx-auto my-2">
          <GoogleSignIn />
          <GithubSignIn />
        </section>
        <p className="my-2 text-center">
          Already Registered?&nbsp;
          <Link to="/" className="card-link">
            Login
          </Link>{" "}
          Now
        </p>
      </div>
    </div>
  );
};

export default Register;
