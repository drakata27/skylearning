import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SectionAdd.css";
import Uploader from "../../components/Uploader/Uploader";
import AuthContext from "../../context/AuthContext";
import BASE_URL from "../../utils/config";

const SectionAdd = () => {
  const swal = require("sweetalert2");
  const { user } = useContext(AuthContext);
  const [cover, setCover] = useState();
  const [checked, setChecked] = useState(false);
  const [section, setSection] = useState({
    user: user.user_id,
    username: user.username,
    title: "",
    subtitle: "",
    cover: cover,
    is_public: checked,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    setSection({ ...section, is_public: checked });
  };

  const createSection = async () => {
    try {
      const formData = new FormData();
      formData.append("title", section.title);
      formData.append("subtitle", section.subtitle);
      formData.append("user", user.user_id);
      formData.append("username", user.username);
      formData.append("is_public", section.is_public);

      if (cover) {
        formData.append("cover", cover);
      } else {
        formData.append("cover", "");
      }

      const url = `${BASE_URL}/api/section/`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error(
          "Error creating section. Server responded with:",
          response.status,
          response.statusText,
        );
        alert("Error creating section");
        return;
      }
      swal.fire({
        title: "Section added successfully!",
        icon: "success",
        toast: "true",
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/learning");
    } catch (error) {
      console.error("Error creating section:", error);
      alert("Error creating section:", error);
    }
  };

  let handleSubmit = () => {
    if (section.title.trim() !== "" && section.subtitle.trim() !== "") {
      createSection();
    } else {
      alert("Section contents cannot be empty");
    }
  };

  const [inputKey] = useState(Date.now());

  const cancel = () => {
    navigate("/learning");
  };

  return (
    <div className="section-add-container">
      <h1>Add Section</h1>
      <div className="section-form">
        <div className="horizontal-container cover-container">
          <Uploader inputKey={inputKey} setCover={setCover} />
        </div>

        <div className="checkbox-container" style={{ marginTop: "2rem" }}>
          <input
            className="checkbox"
            style={{ borderRadius: "15px" }}
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <p>Public</p>
        </div>

        <input
          className="section-title-input"
          type="text"
          name="title"
          placeholder="Title..."
          value={section.title}
          onChange={handleInputChange}
        />
        <input
          className="section-subtitle-input"
          type="text"
          name="subtitle"
          placeholder="Subitle..."
          value={section.subtitle}
          onChange={handleInputChange}
        />

        <button className="section-add-btn" onClick={handleSubmit}>
          Done
        </button>

        <button className="section-cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SectionAdd;
