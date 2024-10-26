import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("renders correctly", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  test("renders image correctly", () => {
    render(<Footer />);
    const imgElement = screen.getByRole("img", { name: /logo/i });
    expect(imgElement).toBeInTheDocument();
  });

  test("renders text correctly", () => {
    const year = 2024;
    render(<Footer />);
    const textElement = screen.getByText(`Copyright © ${year}`);
    expect(textElement).toBeInTheDocument();
  });
});
