import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./TopicPage.css";
import AuthContext from "../../context/AuthContext";
import SubtopicItem from "../../components/SubtopicItem/SubtopicItem";
import BackButton from "../../components/BackButton/BackButton";
import BASE_URL from "../../utils/config";

const TopicPage = () => {
  let { user } = useContext(AuthContext);
  let { id } = useParams();
  let { topicId } = useParams();
  const urlTopic = `${BASE_URL}/api/section/${id}/topic/${topicId}`;
  const urlSubtopic = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic`;

  const [topic, setTopic] = useState({
    title: "",
    subtitle: "",
    cover: null,
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

  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    const getTopic = async () => {
      if (id === "new") return;
      let response = await fetch(urlTopic);
      let data = await response.json();
      setTopic(data);
    };
    getTopic();
  }, [urlTopic, id]);

  useEffect(() => {
    const getSubtopic = async () => {
      let response = await fetch(urlSubtopic);
      let data = await response.json();
      setSubtopics(data);
    };
    getSubtopic();
  }, [urlSubtopic]);

  const urlFetchSection = `${BASE_URL}/api/section/${id}/`;

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

  const getSubtopic = async () => {
    let response = await fetch(urlSubtopic);
    let data = await response.json();
    setSubtopics(data);
  };

  return (
    <div className="topic-page-container list-container">
      <div className="horizontal-container">
        <BackButton />

        {user && user.user_id === section.user ? (
          <Link
            className="add-section-btn"
            to={`/learning/${id}/topic/${topicId}/add`}
          >
            <span class="material-symbols-outlined">add</span>
          </Link>
        ) : (
          <p>{section.username}</p>
        )}
      </div>

      <div className="topic-title-material">
        <h1 className="title">{topic?.title}</h1>

        <div className="horizontal-container">
          <p className="subtopic-p">Materials</p>
        </div>
      </div>

      <div className="topic-container">
        {subtopics.map((subtopic, index) => (
          <SubtopicItem
            key={index}
            section={section}
            topic={topic}
            subtopic={subtopic}
            refreshSubtopic={getSubtopic}
          />
        ))}
      </div>
    </div>
  );
};

export default TopicPage;
