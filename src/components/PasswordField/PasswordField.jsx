import React, { useState } from "react";

import { FaLock, FaEye } from "react-icons/fa";

const PasswordField = ({ ref, isRegistering, setPassword }) => {
  const [toggle, setToggle] = useState("password");
  return (
    <div className="login-input-box">
      {isRegistering === undefined ? (
        <input
          type={toggle}
          name="password"
          placeholder="Password"
          required
          ref={ref}
        />
      ) : (
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      {toggle === "password" ? (
        <FaLock className="login-icon" onClick={() => setToggle("text")} />
      ) : (
        <FaEye
          className="login-icon"
          icon="fa-solid fa-eye"
          onClick={() => setToggle("password")}
        />
      )}
    </div>
  );
};

export default PasswordField;
