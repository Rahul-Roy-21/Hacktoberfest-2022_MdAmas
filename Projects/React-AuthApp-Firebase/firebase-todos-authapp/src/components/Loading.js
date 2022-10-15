import React from "react";

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className="spinner-border text-primary"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default Loading;
