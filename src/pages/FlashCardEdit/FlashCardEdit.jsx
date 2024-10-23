import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../utils/config";
import BackButton from "../../components/BackButton/BackButton";

const FlashCardEdit = () => {
  const swal = require("sweetalert2");
  let { matId, id } = useParams();
  const [card, setCard] = useState({
    question: "",
    answer: "",
    subtopic: matId,
  });

  console.log("matId", matId);

  const url = `${BASE_URL}/api/subtopic/${matId}/flashcard/${id}/edit/`;
  const urlFetch = `${BASE_URL}/api/subtopic/${matId}/flashcard/${id}/`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        const response = await fetch(urlFetch);
        if (!response.ok) {
          console.error(
            "Error fetching card data:",
            response.status,
            response.statusText,
          );
          return;
        }
        const data = await response.json();
        setCard(data);
      } catch (error) {
        alert("Error fetching details: " + error);
      }
    };
    fetchCardDetail();
  }, [urlFetch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const updateCard = async () => {
    const formData = new FormData();
    formData.append("question", card.question);
    formData.append("answer", card.answer);
    formData.append("subtopic", matId);

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        console.error(
          "Error updating card. Server responded with:",
          response.status,
          response.statusText,
        );
        return;
      }

      const data = await response.json();
      setCard(data);
      swal.fire({
        title: "Card updated successfully!",
        icon: "success",
        toast: "true",
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(-1);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div className="flash-card-container">
      <BackButton />
      <h1>Edit Flash Cards</h1>

      <div className="flash-card-form">
        <input
          className="flash-card-input"
          type="text"
          name="question"
          placeholder="Front..."
          value={card.question}
          onChange={(e) =>
            handleInputChange({
              target: { value: e.target.value, name: "question" },
            })
          }
        />
        <input
          className="flash-card-input"
          type="text"
          name="answer"
          placeholder="Back..."
          value={card.answer}
          onChange={(e) =>
            handleInputChange({
              target: { value: e.target.value, name: "answer" },
            })
          }
        />
      </div>

      <div className="card-btns-container">
        <button onClick={updateCard}>Edit</button>
      </div>
    </div>
  );
};

export default FlashCardEdit;
