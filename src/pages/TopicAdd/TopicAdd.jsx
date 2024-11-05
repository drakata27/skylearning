import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../utils/config";
import Form from "../../components/Form/Form";

const TopicAdd = () => {
  const { id } = useParams();
  const [cover, setCover] = useState();
  const [topic, setTopic] = useState({
    title: "",
    subtitle: "",
    cover: cover,
  });

  const navigate = useNavigate();

  const createTopic = async () => {
    try {
      const formData = new FormData();
      formData.append("title", topic.title);
      formData.append("subtitle", topic.subtitle);
      if (cover) {
        formData.append("cover", cover);
      } else {
        formData.append("cover", "");
      }

      const url = `${BASE_URL}/api/section/${id}/topic/`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error(
          "Error creating topic. Server responded with:",
          response.status,
          response.statusText,
        );
        alert("Error creating topic");
        return;
      }
      navigate(`/learning/${id}/`);
    } catch (error) {
      console.error("Error creating topic:", error);
      alert("Error creating topic:", error);
    }
  };

  return (
    <div className="section-add-container">
      <h1>Add Topic</h1>
      <Form
        data={topic}
        createData={createTopic}
        setData={setTopic}
        setCover={setCover}
      />
    </div>
  );
};

export default TopicAdd;
