import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./FlashCardAdd.css";
import BackButton from "../../Components/BackButton/BackButton";
import BASE_URL from "../../utils/config";

const FlashCardAdd = () => {
  const { matId } = useParams();
  const swal = require("sweetalert2");

  const [card, setCard] = useState({
    question: "",
    answer: "",
    subtopic: matId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const createCard = async () => {
    try {
      const formData = new FormData();
      formData.append("question", card.question);
      formData.append("answer", card.answer);
      formData.append("subtopic", matId);

      const url = `${BASE_URL}/api/subtopic/${matId}/flashcard/`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error(
          "Error creating Card. Server responded with:",
          response.status,
          response.statusText,
        );
        alert("Error creating card");
        return;
      }
      setCard({
        question: "",
        answer: "",
        subtopic: matId,
      });

      swal.fire({
        title: "Flash Cards were created successfully",
        icon: "success",
        toast: "true",
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error creating card:", error);
      alert("Error creating card:", error);

      swal.fire({
        title: `Error: ${error}`,
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    }
  };

  let handleSubmit = () => {
    if (card.question.trim() !== "" && card.answer.trim() !== "") {
      createCard();
    } else {
      swal.fire({
        title: "Flash Card content cannot be empty",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flash-card-container">
      <BackButton />
      <h1>Add Cards</h1>

      <div className="flash-card-form">
        <input
          className="flash-card-input"
          type="text"
          name="question"
          placeholder="Front..."
          value={card.question}
          onChange={handleInputChange}
        />
        <input
          className="flash-card-input"
          type="text"
          name="answer"
          placeholder="Back..."
          value={card.answer}
          onChange={handleInputChange}
        />
      </div>

      <div className="card-btns-container">
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default FlashCardAdd;
