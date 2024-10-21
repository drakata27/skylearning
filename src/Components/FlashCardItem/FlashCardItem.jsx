import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/config";
import "./FlashCardItem.css";

import { useParams } from "react-router-dom";
import ActionButton from "../ActionButton/ActionButton";

const FlashCardItem = ({ card, refreshCard }) => {
  const swal = require("sweetalert2");
  const { matId } = useParams();
  const navigate = useNavigate();

  if (!card) {
    return <div>No card found.</div>;
  }

  const url = `${BASE_URL}/api/subtopic/${matId}/flashcard/${card.id}/`;

  let deleteCard = async (e) => {
    e.preventDefault();
    const result = await swal.fire({
      title: `Are you sure you want to delete this Flash Card?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error(
            "Error deleting Card. Server responded with:",
            response.status,
            response.statusText,
          );
          return;
        }
        swal.fire({
          title: `Card was deleted`,
          icon: "success",
          toast: "true",
          timer: 2000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        refreshCard();
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    }
  };

  const handleNavigation = () => {
    navigate(`/material/${matId}/flashcard/${card.id}/edit`);
  };

  return (
    <div className="card-items" data-testid="flash-card-item">
      <p>{card.question}</p>
      <p>{card.answer}</p>

      <div className="buttons-container">
        <ActionButton handleAction={handleNavigation} type="edit" />
        <ActionButton handleAction={deleteCard} type="delete" />
      </div>
    </div>
  );
};

export default FlashCardItem;
