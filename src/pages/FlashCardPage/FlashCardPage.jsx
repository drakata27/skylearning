import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import BASE_URL from "../../utils/config";

import "./FlashCardPage.css";
import FlashCardItem from "../../components/FlashCardItem/FlashCardItem";
import Search from "../../components/Search/Search";

const FlashCardPage = () => {
  const { matId } = useParams();

  let [cards, setCard] = useState([]);
  const [search, setSearch] = useState("");

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
      <Search setSearch={setSearch} />

      <div id="card-item" className="card-item">
        {cards
          .filter((card) => {
            return search.toLowerCase() === ""
              ? card
              : card.question.toLowerCase().includes(search);
          })
          .map((card, index) => (
            <FlashCardItem key={index} card={card} refreshCard={getCards} />
          ))}
      </div>
    </div>
  );
};

export default FlashCardPage;
