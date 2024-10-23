import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SectionEdit.css";
import Placeholder from "../../assets/placeholder.jpg";
import Uploader from "../../components/Uploader/Uploader";
import AuthContext from "../../context/AuthContext";
import BASE_URL from "../../utils/config";

const SectionEdit = () => {
  const swal = require("sweetalert2");
  const { user } = useContext(AuthContext);
  let { id } = useParams();
  const [checked, setChecked] = useState(false);
  const [cover, setCover] = useState();
  const [section, setSection] = useState({
    user: user.user_id,
    username: user.username,
    title: "",
    subtitle: "",
    cover: cover,
    is_public: checked,
  });

  const navigate = useNavigate();
  const url = `${BASE_URL}/api/section/${id}/edit/`;
  const urlFetch = `${BASE_URL}/api/section/${id}/`;

  useEffect(() => {
    const fetchSectionDetail = async () => {
      try {
        const response = await fetch(urlFetch);
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
        setChecked(data.is_public);
      } catch (error) {
        alert("Error fetching details: " + error);
      }
    };
    fetchSectionDetail();
  }, [urlFetch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    setSection({ ...section, is_public: checked });
  };

  const updateSection = async () => {
    const formData = new FormData();
    formData.append("title", section.title);
    formData.append("subtitle", section.subtitle);
    formData.append("user", user.user_id);
    formData.append("username", user.username);
    formData.append("is_public", section.is_public);

    console.log("typeof cover", typeof cover);
    console.log("instance of file", cover instanceof File);

    if (cover) {
      formData.append("cover", cover);
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        console.error(
          "Error updating section. Server responded with:",
          response.status,
          response.statusText,
        );
        return;
      }

      const data = await response.json();
      setSection(data);
      swal.fire({
        title: "Section updated successfully!",
        icon: "success",
        toast: "true",
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(-1);
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };
  const cancel = () => {
    navigate("/learning");
  };

  const [inputKey] = useState(Date.now());

  let imagePath = "No cover";

  if (section.cover) {
    imagePath = section.cover;
  }

  const getImageName = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

  const imageName = getImageName(imagePath);

  return (
    <div className="edit-container">
      <h1>{section.title}</h1>
      <div className="section-form">
        <div className="cover-preview">
          <h1>Current Cover</h1>
          {section.cover ? (
            <img src={section.cover} alt="section cover" />
          ) : (
            <img src={Placeholder} alt="section cover" />
          )}
          <section className="uploaded-row">
            <p>{imageName}</p>
          </section>
        </div>

        <div className="horizontal-container cover-container">
          <Uploader inputKey={inputKey} setCover={setCover} />
        </div>

        <div className="horizontal-container" style={{ marginTop: "2rem" }}>
          <input
            style={{ marginTop: "0" }}
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
          onChange={(e) =>
            handleInputChange({
              target: { value: e.target.value, name: "title" },
            })
          }
        />
        <input
          className="section-subtitle-input"
          type="text"
          name="subtitle"
          placeholder="Subitle..."
          value={section.subtitle}
          onChange={(e) =>
            handleInputChange({
              target: { value: e.target.value, name: "subtitle" },
            })
          }
        />

        <button className="section-add-btn" onClick={updateSection}>
          Done
        </button>

        <button className="section-cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SectionEdit;
