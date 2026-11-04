import { collections } from "../data/collections.js";
import { getPreviewState } from "./previewState.js";

/** @type {import('./types.js').ApiClient} */
export const mockClient = {
  async getCollections() {
    const state = getPreviewState();
    if (state === "loading") return new Promise(() => {});
    if (state === "error") throw new Error("No se pudieron cargar los diseños.");
    if (state === "empty") return [];
    await new Promise((resolve) => window.setTimeout(resolve, 80));
    return collections;
  },
};