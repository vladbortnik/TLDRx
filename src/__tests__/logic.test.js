import { describe, it, expect } from "vitest";
import { fuzzySearch, searchCommand } from "../logic/search.js";
import { enhanceCommands } from "../logic/commands.js";

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
