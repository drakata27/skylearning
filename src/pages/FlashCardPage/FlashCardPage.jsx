import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import BASE_URL from "../../utils/config";

import "./FlashCardPage.css";
import FlashCardItem from "../../components/FlashCardItem/FlashCardItem";

const FlashCardPage = () => {
  const { matId } = useParams();

  let [cards, setCard] = useState([]);
  const url = `${BASE_URL}/api/subtopic/${matId}/flashcard/`;

  useEffect(() => {
    const getCards = async () => {
      let response = await fetch(url);
      let data = await response.json();
      setCard(data);
    };
    getCards();
  }, [url]);

  const getCards = async () => {
    let response = await fetch(url);
    let data = await response.json();
    setCard(data);
  };

  return (
    <div className="flashcard-container">
      <BackButton />
      <h1>My Flash Cards</h1>

      <div id="card-item" className="card-item">
        {cards.map((card, index) => (
          <FlashCardItem key={index} card={card} refreshCard={getCards} />
        ))}
      </div>
    </div>
  );
};

export default FlashCardPage;
