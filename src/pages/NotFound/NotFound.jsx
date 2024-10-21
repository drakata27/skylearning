import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>This Page cannot be found</h1>
      <img
        src="https://cloud-learn-bucket.s3.eu-west-2.amazonaws.com/assets/404-error.jpg"
        alt="unauthorized"
      />
    </div>
  );
};

export default NotFound;
