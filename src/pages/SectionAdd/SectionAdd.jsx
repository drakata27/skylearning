import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SectionAdd.css";
import AuthContext from "../../context/AuthContext";
import BASE_URL from "../../utils/config";
import Form from "../../components/Form/Form";

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

  return (
    <div className="section-add-container">
      <h1>Add Section</h1>
      <Form
        data={section}
        handleData={createSection}
        setData={setSection}
        setCover={setCover}
        setChecked={setChecked}
        checked={checked}
      />
    </div>
  );
};

export default SectionAdd;
