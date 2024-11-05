import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Placeholder from "../../assets/placeholder.png";
import AuthContext from "../../context/AuthContext";
import BASE_URL from "../../utils/config";
import ActionButton from "../ActionButton/ActionButton";

const TopicItem = ({ section, topic, refreshTopic }) => {
  const { user } = useContext(AuthContext);
  const swal = require("sweetalert2");
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `${BASE_URL}/api/section/${id}/topic/${topic.id}`;
  const token = localStorage.getItem("authTokens");

  let deleteTopic = async (e) => {
    e.preventDefault();
    const result = await swal.fire({
      title: `Are you sure you want to delete topic "${topic.title}"?`,
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
            "Error deleting Topic. Server responded with:",
            response.status,
            response.statusText,
          );
          return;
        }
        swal.fire({
          title: `Topic "${topic.title}" was deleted`,
          icon: "success",
          toast: "true",
          timer: 2000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        refreshTopic();
      } catch (error) {
        console.error("Error deleting topic:", error);
      }
    }
  };
  const handleNavigation = (e) => {
    e.preventDefault();
    navigate(`/learning/${section.id}/topic/${topic.id}/edit`);
  };

  return (
    <Link to={`topic/${topic.id}/`}>
      <div className="section-item-container horizontal-container">
        <div className="section-item-cover">
          {topic.cover ? (
            <img src={topic.cover} alt="topic cover" />
          ) : (
            <img src={Placeholder} alt="section cover" />
          )}
        </div>

        <div className="section-item-content">
          <h2>{topic.title}</h2>
          <h3>{topic.subtitle}</h3>
        </div>

        {token && section.user === user.user_id ? (
          <>
            <div className="section-item-btns">
              <ActionButton
                handleAction={handleNavigation}
                className={"section-edit-btn"}
                type="edit"
              />

              <ActionButton
                handleAction={deleteTopic}
                className={"section-delete-btn"}
                type="delete"
              />
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </Link>
  );
};

export default TopicItem;
