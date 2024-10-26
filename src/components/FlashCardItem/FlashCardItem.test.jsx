import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FlashCardItem from "./FlashCardItem";

describe("FlashCardItem", () => {
  test("renders FlashCardItem correctly", () => {
    const card = { id: 1, question: "Test Question?", answer: "Test Answer" };
    const refreshCard = jest.fn();

    render(
      <MemoryRouter>
        <FlashCardItem card={card} refreshCard={refreshCard} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Test Question\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Answer/i)).toBeInTheDocument();
  });
});
