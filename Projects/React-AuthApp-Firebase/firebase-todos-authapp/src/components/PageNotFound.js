import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div
      className="d-flex justify-content-center flex-column vw-80 mx-auto"
      style={{
        textAlign: "center",
        margin: "1em",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "2px",
        maxWidth: "600px",
      }}
    >
      <p className="page-not-found alert alert-danger">Page Not Found</p>
      <p>
        <Link to="/">
          <button className="btn btn-primary">Go Back</button>
        </Link>
      </p>
    </div>
  );
}

export default PageNotFound;
