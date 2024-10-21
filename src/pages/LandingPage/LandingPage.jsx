import { Link } from "react-router-dom";
import "./LandingPage.css";
import LandingImage from "../../assets/landing.png";

import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LandingPage = () => {
  useGSAP(() => {
    gsap.to(".motto", {
      opacity: 1,
      delay: 0.3,
    });

    gsap.to(".demo-img", {
      opacity: 1,
      y: -20,
      delay: 0.2,
    });
  }, []);

  return (
    <div className="landing-section">
      <div className="motto">
        <p>Where you can</p>
        <p>Learn more</p>
        <p>
          Learning can be difficult but with an organised way to take notes and
          active recalling using flash cards, you can learn more efficiently
        </p>
        <p style={{ color: "rgb(188, 187, 179);" }}>
          👉
          <Link to={"/login"} className="login">
            Login
          </Link>
          or try
          <Link to={"/login"} className="login" style={{ color: "teal" }}>
            Demo
          </Link>
        </p>
        <img className="demo-img" src={LandingImage} alt="Demo" />
      </div>
    </div>
  );
};

export default LandingPage;
