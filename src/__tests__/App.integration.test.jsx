import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App.jsx";

// Mock react-virtuoso so that all items are rendered into the DOM
vi.mock("react-virtuoso", () => {
  return {
    Virtuoso: ({ data, itemContent }) => (
      <div data-testid="virtuoso-mock">
        {Array.isArray(data)
          ? data.map((item, index) => itemContent(index, item))
          : null}
      </div>
    ),
  };
});

function createMockCommands() {
  return [
    {
      name: "ls",
      standsFor: "list",
      description: "List directory contents",
      keyFeatures: [],
      examples: ["ls"],
      platform: ["linux"],
      category: "file-operations",
      safety: "safe",
      syntaxPattern: "ls [options] [file]",
      prerequisites: { foundational_concepts: "", prior_commands: "", risk_awareness: "" },
      commandCombinations: [],
      relatedCommands: [],
      warnings: [],
      manPageUrl: "https://man7.org/linux/man-pages/man1/ls.1.html",
    },
    {
      name: "grep",
      standsFor: "global regular expression print",
      description: "Search for patterns in files",
      keyFeatures: [],
      examples: ["grep pattern file"],
      platform: ["linux"],
      category: "text-processing",
      safety: "safe",
      syntaxPattern: "grep [options] pattern [file]",
      prerequisites: { foundational_concepts: "", prior_commands: "", risk_awareness: "" },
      commandCombinations: [],
      relatedCommands: [],
      warnings: [],
      manPageUrl: "https://man7.org/linux/man-pages/man1/grep.1.html",
    },
    {
      name: "curl",
      standsFor: "client url",
      description: "Transfer data from or to a server",
      keyFeatures: [],
      examples: ["curl https://example.com"],
      platform: ["linux"],
      category: "networking",
      safety: "safe",
      syntaxPattern: "curl [options] [url]",
      prerequisites: { foundational_concepts: "", prior_commands: "", risk_awareness: "" },
      commandCombinations: [],
      relatedCommands: [],
      warnings: [],
      manPageUrl: "https://curl.se/docs/manpage.html",
    },
    {
      name: "tar",
      standsFor: "tape archive",
      description: "Create and extract archives",
      keyFeatures: [],
      examples: ["tar -czf archive.tar.gz dir"],
      platform: ["linux"],
      category: "file-operations",
      safety: "safe",
      syntaxPattern: "tar [options] [file]",
      prerequisites: { foundational_concepts: "", prior_commands: "", risk_awareness: "" },
      commandCombinations: [],
      relatedCommands: [],
      warnings: [],
      manPageUrl: "https://man7.org/linux/man-pages/man1/tar.1.html",
    },
    {
      name: "ls-duplicate",
      standsFor: "list duplicate",
      description: "Synthetic duplicate name variant for testing",
      keyFeatures: [],
      examples: ["ls-duplicate"],
      platform: ["linux"],
      category: "file-operations",
      safety: "safe",
      syntaxPattern: "ls-duplicate",
      prerequisites: { foundational_concepts: "", prior_commands: "", risk_awareness: "" },
      commandCombinations: [],
      relatedCommands: [{ name: "ls", reason: "Base listing command" }],
      warnings: [],
      manPageUrl: "https://example.com/ls-duplicate",
    },
  ];
}

describe("App integration – commands and search", () => {
  it("renders all commands with matching counters", async () => {
    const mockCommands = createMockCommands();

    render(<App mockCommands={mockCommands} />);

    await waitFor(() => {
      expect(screen.getByTestId("results-count-text").textContent).toBe(
        `${mockCommands.length} commands found`,
      );
    });

    const headerText = screen.getByTestId("header-command-count").textContent;
    const headerCount = parseInt(headerText.replace(/\D/g, ""), 10) || 0;

    const cardNodes = document.querySelectorAll("[data-command-name]");

    expect(cardNodes.length).toBe(mockCommands.length);
    expect(headerCount).toBe(mockCommands.length);
  });

  it("filters to a single command when searching by exact name", async () => {
    const mockCommands = createMockCommands();
    const targetName = "curl";

    render(<App mockCommands={mockCommands} />);

    const input = screen.getByLabelText("Search commands");
    fireEvent.change(input, { target: { value: targetName } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByTestId("results-count-text").textContent).toBe(
        "1 command found",
      );
    });

    const names = Array.from(
      document.querySelectorAll("[data-command-name]"),
    ).map((node) => node.getAttribute("data-command-name"));

    expect(names).toEqual([targetName]);
  });

  it("shows zero results for a query with no matches", async () => {
    const mockCommands = createMockCommands();

    render(<App mockCommands={mockCommands} />);

    const input = screen.getByLabelText("Search commands");
    fireEvent.change(input, { target: { value: "non-existent-command-xyz" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByTestId("results-count-text").textContent).toBe(
        "0 commands found",
      );
    });

    const cardNodes = document.querySelectorAll("[data-command-name]");
    expect(cardNodes.length).toBe(0);
  });

  it("does not duplicate results for related commands with the same base name", async () => {
    const mockCommands = createMockCommands();

    render(<App mockCommands={mockCommands} />);

    const input = screen.getByLabelText("Search commands");
    fireEvent.change(input, { target: { value: "ls" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      const text = screen.getByTestId("results-count-text").textContent;
      const count = parseInt(text.replace(/\D/g, ""), 10) || 0;
      expect(count).toBeGreaterThanOrEqual(1);
    });

    const names = Array.from(
      document.querySelectorAll("[data-command-name]"),
    ).map((node) => node.getAttribute("data-command-name"));

    const uniqueNames = Array.from(new Set(names));
    expect(uniqueNames.length).toBe(names.length);
  });
});
