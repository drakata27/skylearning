import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Link
      onClick={() => navigate(-1)}
      className="back-btn"
      data-testid="back-btn"
    >
      <span class="material-symbols-outlined">arrow_back</span>
    </Link>
  );
};

export default BackButton;
