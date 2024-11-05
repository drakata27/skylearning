import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SubtopicAdd.css";

import "react-quill/dist/quill.snow.css";
import BASE_URL from "../../utils/config";
import AuthContext from "../../context/AuthContext";
import Form from "../../components/Form/Form";

const SubtopicAdd = () => {
  const { id } = useParams();
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [cover, setCover] = useState();
  const [subtopic, setSubtopic] = useState({
    user: user.user_id,
    title: "",
    subtitle: "",
    body: "",
    cover: cover,
  });

  const createSubtopic = async () => {
    try {
      const formData = new FormData();
      formData.append("user", user.user_id);
      formData.append("title", subtopic.title);
      formData.append("subtitle", subtopic.subtitle);
      formData.append("body", subtopic.body);
      if (cover) {
        formData.append("cover", cover);
      } else {
        formData.append("cover", "");
      }

      const url = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error(
          "Error creating subtopic. Server responded with:",
          response.status,
          response.statusText,
        );
        alert("Error creating subtopic");
        return;
      }
      navigate(`/learning/${id}/topic/${topicId}/`);
    } catch (error) {
      console.error("Error creating topic:", error);
      alert("Error creating topic:", error);
    }
  };

  return (
    <div className="subtopic-add-container">
      <h1>Add Material</h1>
      <Form
        data={subtopic}
        handleData={createSubtopic}
        setData={setSubtopic}
        setCover={setCover}
        editor={true}
      />
    </div>
  );
};

export default SubtopicAdd;
