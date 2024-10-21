import "./SectionList.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import SectionItem from "../../Components/SectionItem/SectionItem";
import AuthContext from "../../context/AuthContext";
import BASE_URL from "../../utils/config";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SectionList = () => {
  useGSAP(() => {
    gsap.to("#section-list-header", {
      opacity: 1,
      delay: 0.2,
    });

    gsap.to(".add-section-btn", {
      opacity: 1,
      delay: 0.2,
    });

    gsap.to(".section-item", {
      opacity: 1,
      y: -23,
      delay: 0.2,
    });
  }, []);

  let [sections, setSections] = useState([]);
  const token = localStorage.getItem("authTokens");
  const url = `${BASE_URL}/api/section/`;
  const { user } = useContext(AuthContext);

  let getSections = useCallback(async () => {
    let response = await fetch(url);
    let data = await response.json();
    setSections(data.filter((section) => section.user === user.user_id));
  }, [user.user_id, url]);

  useEffect(() => {
    getSections();
  }, [getSections]);

  return (
    <div className="section-list-container">
      <div className="section-list-header horizontal-container">
        <div id="section-list-header" style={{ opacity: 0 }}>
          <h1 className="title">My Learning</h1>

          <div className="horizontal-container nav-elements">
            <p className="section-p">Sections</p>
          </div>
        </div>

        {token !== null ? (
          <Link style={{ opacity: 0 }} className="add-section-btn" to="add/">
            <span class="material-symbols-outlined">add</span>
          </Link>
        ) : (
          <></>
        )}
      </div>

      {token === null ? (
        <>
          <h2>Looks like you are not logged in</h2>
          <p>Log in or join for free</p>
          <div className="btns-container">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </>
      ) : (
        <>
          <div className="section-item" style={{ opacity: 0 }}>
            {sections.map((section, index) => (
              <SectionItem
                key={index}
                section={section}
                refreshSection={getSections}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SectionList;
