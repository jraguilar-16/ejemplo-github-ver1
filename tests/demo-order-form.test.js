import { describe, expect, it } from "vitest";
import { createDemoOrderSummary } from "../src/components/demo-order-form.js";

describe("createDemoOrderSummary", () => {
  it("creates a local order summary without altering form values", () => {
    const formData = new FormData();
    formData.set("name", "Ana García");
    formData.set("email", "ana@example.com");
    formData.set("accent", "Terracota");
    formData.set("quantity", "1");
    formData.set("note", "Sin dedicatoria");

    expect(createDemoOrderSummary(formData)).toEqual({
      name: "Ana García",
      email: "ana@example.com",
      accent: "Terracota",
      note: "Sin dedicatoria",
      product: "Libreta A5 de tapa dura",
      quantity: 1,
      total: 24,
    });
    expect(formData.get("email")).toBe("ana@example.com");
  });

  it("supplies the sample note when the note is blank", () => {
    const formData = new FormData();
    formData.set("note", "  ");
    formData.set("quantity", "2");
    expect(createDemoOrderSummary(formData).note).toBe("Sin dedicatoria");
    expect(createDemoOrderSummary(formData).total).toBe(48);
  });
});