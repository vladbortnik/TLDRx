import { describe, it, expect } from "vitest";
import { fuzzySearch, searchCommand } from "../logic/search.js";
import {
  enhanceCommands,
  filterCommandsByPlatformAndCategory,
} from "../logic/commands.js";

const makeCommand = (overrides = {}) => ({
  name: "ls",
  description: "List files",
  ...overrides,
});

describe("fuzzySearch", () => {
  it("returns 0 when there is no match", () => {
    expect(fuzzySearch("xyz", "abc")).toBe(0);
  });

  it("gives higher score for exact substring than no match", () => {
    const score = fuzzySearch("ls", "ls -la");
    expect(score).toBeGreaterThan(0);
  });

  it("is case-insensitive", () => {
    const lowerScore = fuzzySearch("ls", "List files");
    const upperScore = fuzzySearch("LS", "list files");
    expect(lowerScore).toBeGreaterThan(0);
    expect(upperScore).toBe(lowerScore);
  });
});

describe("searchCommand", () => {
  it("prioritizes exact name match with very high score", () => {
    const cmd = makeCommand({ name: "curl", description: "Transfer data" });
    const score = searchCommand("curl", cmd);
    expect(score).toBe(100000);
  });

  it("boosts prefix name matches over description-only matches", () => {
    const cmd = makeCommand({ name: "curlpipe", description: "curl + pipe" });
    const prefixScore = searchCommand("curl", cmd);
    const descOnlyScore = searchCommand("pipe", cmd);
    expect(prefixScore).toBeGreaterThan(descOnlyScore);
  });

  it("returns 0 for short queries when neither name nor description match", () => {
    const cmd = makeCommand({ name: "curl", description: "Transfer data" });
    const score = searchCommand("zz", cmd);
    expect(score).toBe(0);
  });
});

describe("enhanceCommands", () => {
  it("returns empty array for non-array input", () => {
    expect(enhanceCommands(null)).toEqual([]);
  });

  it("fills missing platform and category with defaults", () => {
    const raw = [{ name: "ls" }];
    const [enhanced] = enhanceCommands(raw);
    expect(enhanced.platform).toEqual(["linux"]);
    expect(enhanced.category).toBe("general");
  });

  it("preserves existing platform and category", () => {
    const raw = [{ name: "ls", platform: ["macos"], category: "file" }];
    const [enhanced] = enhanceCommands(raw);
    expect(enhanced.platform).toEqual(["macos"]);
    expect(enhanced.category).toBe("file");
  });
});

describe("filterCommandsByPlatformAndCategory", () => {
  const sampleCommands = [
    { name: "ls", platform: ["linux", "macos"], category: "file" },
    { name: "dir", platform: ["windows"], category: "file" },
    { name: "curl", platform: ["linux"], category: "network" },
  ];

  it("returns empty array when commands is not an array", () => {
    expect(
      filterCommandsByPlatformAndCategory(null, ["linux"], ["file"])
    ).toEqual([]);
  });

  it("returns all commands when no filters are selected", () => {
    const result = filterCommandsByPlatformAndCategory(sampleCommands, [], []);
    expect(result).toHaveLength(3);
  });

  it("filters by selected platforms", () => {
    const result = filterCommandsByPlatformAndCategory(
      sampleCommands,
      ["windows"],
      []
    );
    expect(result.map((c) => c.name)).toEqual(["dir"]);
  });

  it("filters by selected categories", () => {
    const result = filterCommandsByPlatformAndCategory(
      sampleCommands,
      [],
      ["network"]
    );
    expect(result.map((c) => c.name)).toEqual(["curl"]);
  });

  it("applies both platform and category filters together", () => {
    const result = filterCommandsByPlatformAndCategory(
      sampleCommands,
      ["linux"],
      ["file"]
    );
    expect(result.map((c) => c.name)).toEqual(["ls"]);
  });
});
