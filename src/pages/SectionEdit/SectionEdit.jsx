import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SectionEdit.css";
import AuthContext from "../../context/AuthContext";
import BASE_URL from "../../utils/config";
import Form from "../../components/Form/Form";

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

  return (
    <div className="edit-container">
      <h1>{section.title}</h1>
      <Form
        data={section}
        handleData={updateSection}
        setData={setSection}
        setCover={setCover}
        setChecked={setChecked}
        checked={checked}
        edit={true}
      />
    </div>
  );
};

export default SectionEdit;
