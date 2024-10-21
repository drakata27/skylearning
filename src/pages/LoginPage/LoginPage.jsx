import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./LoginPage.css";

import { FaUser, FaLock } from "react-icons/fa";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LoginPage = () => {
  useGSAP(() => {
    gsap.to(".login-container", {
      y: -23,
      opacity: 1,
      delay: 0.2,
    });
  }, []);

  const { loginUser } = useContext(AuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
    } catch (error) {}
  };

  const handleDemoLogin = async () => {
    const demoEmail = "demo@email.com";
    const demoPassword = "demopassword";

    emailRef.current.value = demoEmail;
    passwordRef.current.value = demoPassword;
    try {
      await loginUser(demoEmail, demoPassword);
    } catch (error) {
      console.log("Demo login failed: ", error);
    }
  };

  return (
    <div className="login-container" style={{ opacity: 0 }}>
      <div className="login-wrapper">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit} ref={formRef}>
          <div className="login-input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              ref={emailRef}
            />
            <FaUser className="login-icon" />
          </div>
          <div className="login-input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <FaLock className="login-icon" />
          </div>

          <button type="submit">Login</button>
          <button className="demo-btn" onClick={handleDemoLogin}>
            Demo
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
