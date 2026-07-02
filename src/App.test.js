import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the portfolio builder home page", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /build your portfolio/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
});
