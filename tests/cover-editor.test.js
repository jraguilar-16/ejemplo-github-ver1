import { describe, expect, it } from "vitest";
import { splitCoverTitle } from "../src/components/cover-editor.js";

describe("splitCoverTitle", () => {
  it("keeps short titles on one line", () => {
    expect(splitCoverTitle("Cielo nocturno")).toEqual(["Cielo nocturno"]);
  });

  it("balances longer titles after the second word", () => {
    expect(splitCoverTitle("Flores silvestres para siempre")).toEqual(["Flores silvestres", "para siempre"]);
  });

  it("trims whitespace and handles empty input", () => {
    expect(splitCoverTitle("  ")).toEqual([""]);
  });
});