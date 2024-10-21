import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Placeholder from "../../assets/placeholder.jpg";

import "./SubtopicPage.css";
import BackButton from "../../Components/BackButton/BackButton";
import BASE_URL from "../../utils/config";
import AuthContext from "../../context/AuthContext";
import ActionButton from "../../Components/ActionButton/ActionButton";

const SubtopicPage = () => {
  let { id, topicId, matId } = useParams();
  const swal = require("sweetalert2");
  const token = localStorage.getItem("authTokens");
  const { user } = useContext(AuthContext);
  const [cover] = useState();

  const [subtopic, setSubtopic] = useState({
    title: "",
    subtitle: "",
    body: "",
    cover: cover,
  });

  const [section, setSection] = useState({
    // user: user.user_id,
    // username: user.username,
    user: null,
    username: "",
    title: "",
    subtitle: "",
    cover: "",
  });

  const navigate = useNavigate();
  const urlFetchSection = `${BASE_URL}/api/section/${id}/`;
  const urlFetch = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/${matId}/`;
  const url = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/${subtopic.id}`;

  useEffect(() => {
    const fetchSectionDetail = async () => {
      try {
        const response = await fetch(urlFetchSection);
        if (!response.ok) {
          console.error(
            "Error fetching section data:",
            response.status,
            response.statusText,
          );
          return;
        }
        const data = await response.json();
        setSection(data);
      } catch (error) {
        alert("Error fetching details: " + error);
      }
    };
    fetchSectionDetail();
  }, [urlFetchSection]);

  useEffect(() => {
    const fetchSubtopicDetails = async () => {
      try {
        const response = await fetch(urlFetch);
        if (!response.ok) {
          console.error(
            "Error fetching subtopic data:",
            response.status,
            response.statusText,
          );
          return;
        }
        const data = await response.json();
        setSubtopic(data);
      } catch (error) {
        alert("Error fetching details: " + error);
      }
    };
    fetchSubtopicDetails();
  }, [urlFetch]);

  let deleteSubtopic = async (e) => {
    e.preventDefault();
    const result = await swal.fire({
      title: `Are you sure you want to delete subtopic "${subtopic.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error(
            "Error deleting Subtopic. Server responded with:",
            response.status,
            response.statusText,
          );
          return;
        }
        swal.fire({
          title: `Subtopic "${subtopic.title}" was deleted`,
          icon: "success",
          toast: "true",
          timer: 2000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        navigate(`/learning/${id}/topic/${topicId}/`);
      } catch (error) {
        console.error("Error deleting subtopic:", error);
      }
    }
  };

  const handleNavigation = (e, url) => {
    e.preventDefault();
    navigate(`/learning/${id}/topic/${topicId}/material/${subtopic.id}/edit/`);
  };
  return (
    <div className="subtopic-container">
      <div className="horizontal-container">
        <BackButton />

        {token && section.user === user.user_id ? (
          <div className="section-item-btns-subtopic">
            <ActionButton
              handleAction={handleNavigation}
              type="edit"
              className="section-edit-btn"
            />

            <ActionButton
              handleAction={deleteSubtopic}
              type="delete"
              className="section-delete-btn"
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="title-container">
        <h1 className="title">{subtopic?.title}</h1>
        <h2>{subtopic.subtitle}</h2>
      </div>

      <div className="cover-preview">
        {subtopic.cover ? (
          <img src={subtopic.cover} alt="material cover" />
        ) : (
          <img src={Placeholder} alt="material cover" />
        )}
        <div
          className="ql-editor"
          style={{ border: "none", marginBottom: "6rem" }}
          dangerouslySetInnerHTML={{ __html: subtopic?.body }}
        ></div>
      </div>

      <div className="flash-card-btns">
        {subtopic.user === user.user_id ? (
          <>
            <Link
              to={`/material/${matId}/flashcard`}
              className="btn-flash-card"
              style={{ backgroundColor: "red" }}
            >
              My Flash Cards
            </Link>
            <Link
              to={`/material/${matId}/flashcard/add`}
              className="btn-flash-card"
            >
              Add Flash Card
            </Link>
          </>
        ) : (
          <></>
        )}
        <Link
          to={`/material/${matId}/flashcard/test`}
          className="btn-flash-card"
          style={{ backgroundColor: "darkOrange" }}
        >
          Test
        </Link>
      </div>
    </div>
  );
};

export default SubtopicPage;
