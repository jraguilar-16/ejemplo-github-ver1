import { describe, expect, it } from "vitest";
import {
  IMAGE_UPLOAD_ERROR,
  MAX_IMAGE_SIZE_BYTES,
  validateImageFile,
} from "../src/components/image-upload.js";

describe("validateImageFile", () => {
  it.each(["image/jpeg", "image/png", "image/webp"])("accepts %s images", (type) => {
    expect(validateImageFile({ type, size: MAX_IMAGE_SIZE_BYTES })).toBe("");
  });

  it("rejects unsupported image formats", () => {
    expect(validateImageFile({ type: "image/gif", size: 100 })).toBe(IMAGE_UPLOAD_ERROR);
  });

  it("rejects images larger than 10 MB", () => {
    expect(validateImageFile({ type: "image/jpeg", size: MAX_IMAGE_SIZE_BYTES + 1 })).toBe(IMAGE_UPLOAD_ERROR);
  });

  it("rejects an empty selection", () => {
    expect(validateImageFile(null)).toBe(IMAGE_UPLOAD_ERROR);
  });
});