import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResultsCounter } from "../components/search/ResultsCounter.jsx";

describe("ResultsCounter", () => {
  it("renders 0 commands correctly", () => {
    render(<ResultsCounter count={0} />);
    expect(screen.getByTestId("results-count-text").textContent).toBe(
      "0 commands found",
    );
  });

  it("renders singular form for 1 command", () => {
    render(<ResultsCounter count={1} />);
    expect(screen.getByTestId("results-count-text").textContent).toBe(
      "1 command found",
    );
  });

  it("renders plural form for multiple commands", () => {
    render(<ResultsCounter count={2} />);
    expect(screen.getByTestId("results-count-text").textContent).toBe(
      "2 commands found",
    );
  });
});
