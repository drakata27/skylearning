import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../utils/config";
import Form from "../../components/Form/Form";

const TopicEdit = () => {
  const swal = require("sweetalert2");
  let { id } = useParams();
  let { topicId } = useParams();
  const [cover, setCover] = useState();
  const [topic, setTopic] = useState({
    title: "",
    subtitle: "",
    cover: cover,
    section: id,
  });

  const url = `${BASE_URL}/api/section/${id}/topic/${topicId}/edit/`;
  const urlFetch = `${BASE_URL}/api/section/${id}/topic/${topicId}/`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopicDetail = async () => {
      try {
        const response = await fetch(urlFetch);
        if (!response.ok) {
          console.error(
            "Error fetching topic data:",
            response.status,
            response.statusText,
          );
          return;
        }
        const data = await response.json();
        setTopic(data);
      } catch (error) {
        alert("Error fetching details: " + error);
      }
    };
    fetchTopicDetail();
  }, [urlFetch]);

  const updateTopic = async () => {
    const formData = new FormData();
    formData.append("title", topic.title);
    formData.append("subtitle", topic.subtitle);
    formData.append("section", id);

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
          "Error updating topic. Server responded with:",
          response.status,
          response.statusText,
        );
        return;
      }

      const data = await response.json();
      setTopic(data);
      swal.fire({
        title: "Topic updated successfully!",
        icon: "success",
        toast: "true",
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(`/learning/${id}/`);
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  return (
    <div>
      <h1>{topic.title}</h1>
      <Form
        data={topic}
        handleData={updateTopic}
        setData={setTopic}
        setCover={setCover}
        edit={true}
      />
    </div>
  );
};

export default TopicEdit;
