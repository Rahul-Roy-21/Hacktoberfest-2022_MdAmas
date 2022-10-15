import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="container vh-100 vw-100 d-flex align-items-center justify-content-center">
      <ToastContainer
        style={{ textTransform: "uppercase", letterSpacing: "1px" }}
      />
      <Outlet />
    </div>
  );
};

export default Layout;
