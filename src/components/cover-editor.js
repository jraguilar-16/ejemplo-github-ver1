import { createIcons, Flower2, Heart, Sparkles, Sun, Waves } from "lucide";
import { initImageUpload } from "./image-upload.js";

const defaults = {
  title: "Flores silvestres",
  subtitle: "un lugar para anotar ideas sin prisa",
  author: "Ana García",
  style: "floral",
  colors: { front: "#E8876A", back: "#355C4D" },
};
const stickerIcons = { flower: "flower-2", sun: "sun", sparkles: "sparkles", heart: "heart", waves: "waves" };
const icons = { Flower2, Heart, Sparkles, Sun, Waves };

export function splitCoverTitle(title) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  return words.length > 2 ? [words.slice(0, 2).join(" "), words.slice(2).join(" ")] : [words.join(" ")];
}

export function initCoverEditor() {
  const titleInput = document.querySelector("#cover-title");
  const subtitleInput = document.querySelector("#cover-subtitle");
  const authorInput = document.querySelector("#cover-author");
  const styleSelect = document.querySelector("#cover-style");
  const customColor = document.querySelector("#custom-color");
  const photoInput = document.querySelector("#photo-upload");
  const uploadMessage = document.querySelector("#upload-message");
  const retryButton = document.querySelector("#retry-upload");
  const applyToBoth = document.querySelector("#apply-to-both");
  const covers = { front: document.querySelector("#front-cover"), back: document.querySelector("#back-cover") };
  const state = { side: "front", colors: { ...defaults.colors }, style: defaults.style, photoUrl: "", photoOnBoth: true, stickers: { front: [], back: [] } };
  const clearImage = initImageUpload({
    input: photoInput,
    message: uploadMessage,
    retryButton,
    onImageChange: (photoUrl) => { state.photoUrl = photoUrl; renderCover(); },
  });

  function renderCover() {
    const titleNode = document.querySelector("#preview-title");
    const titleParts = [];
    splitCoverTitle(titleInput.value.trim() || defaults.title).forEach((line, index) => {
      if (index) titleParts.push(document.createElement("br"));
      titleParts.push(document.createTextNode(line));
    });
    titleNode.replaceChildren(...titleParts);
    const subtitleNode = document.querySelector("#preview-subtitle");
    subtitleNode.textContent = subtitleInput.value.trim();
    subtitleNode.hidden = !subtitleNode.textContent;
    const author = authorInput.value.trim() || defaults.author;
    document.querySelector("#preview-author").textContent = author;
    document.querySelector("#back-author").textContent = author;

    Object.entries(covers).forEach(([side, cover]) => {
      cover.style.setProperty("--cover-color", state.colors[side]);
      cover.className = `book-cover ${side === "front" ? "front-cover" : "back-cover"} cover-pattern-${side === "front" ? state.style : "plain"}`;
      const showPhoto = state.photoUrl && (state.photoOnBoth || state.side === side);
      cover.classList.toggle("has-photo", Boolean(showPhoto));
      cover.querySelector(".cover-photo").style.backgroundImage = showPhoto ? `url("${state.photoUrl}")` : "";
      cover.classList.toggle("is-active", state.side === side);
      const stickerLayer = cover.querySelector(".cover-stickers");
      stickerLayer.replaceChildren(...state.stickers[side].map((sticker, index) => {
        const element = document.createElement("span");
        element.className = `sticker sticker-${index}`;
        element.dataset.lucide = stickerIcons[sticker];
        return element;
      }));
    });

    document.querySelectorAll(".sticker-button").forEach((button) => {
      const selected = state.stickers[state.side].includes(button.dataset.sticker);
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".side-button").forEach((button) => {
      const selected = button.dataset.side === state.side;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    createIcons({ icons });
  }

  function setColor(color, selectedButton) {
    state.colors[state.side] = color;
    document.querySelectorAll(".color-swatch").forEach((button) => {
      const selected = button === selectedButton;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    customColor.value = color;
    renderCover();
  }

  [titleInput, subtitleInput, authorInput].forEach((input) => input.addEventListener("input", renderCover));
  document.querySelectorAll(".side-button").forEach((button) => button.addEventListener("click", () => {
    state.side = button.dataset.side;
    setColor(state.colors[state.side], null);
  }));
  document.querySelectorAll(".color-swatch").forEach((button) => button.addEventListener("click", () => setColor(button.dataset.color, button)));
  customColor.addEventListener("input", () => setColor(customColor.value.toUpperCase(), null));
  styleSelect.addEventListener("change", () => { state.style = styleSelect.value; renderCover(); });
  applyToBoth.addEventListener("change", () => { state.photoOnBoth = applyToBoth.checked; renderCover(); });

  document.querySelector("#recursos").addEventListener("click", (event) => {
    const button = event.target.closest(".sticker-button");
    if (!button) return;
    const stickers = state.stickers[state.side];
    const index = stickers.indexOf(button.dataset.sticker);
    if (index >= 0) stickers.splice(index, 1);
    else if (stickers.length < 5) stickers.push(button.dataset.sticker);
    renderCover();
  });

  document.querySelector("#colecciones").addEventListener("click", (event) => {
    const link = event.target.closest("[data-preset]");
    if (!link) return;
    styleSelect.value = link.dataset.preset;
    state.style = link.dataset.preset;
    setColor(link.dataset.color, null);
  });

  document.querySelector("#reset-design").addEventListener("click", () => {
    titleInput.value = defaults.title;
    subtitleInput.value = defaults.subtitle;
    authorInput.value = defaults.author;
    styleSelect.value = defaults.style;
    state.side = "front";
    state.style = defaults.style;
    state.colors = { ...defaults.colors };
    state.photoOnBoth = true;
    state.stickers = { front: [], back: [] };
    applyToBoth.checked = true;
    photoInput.value = "";
    uploadMessage.textContent = "";
    retryButton.hidden = true;
    clearImage();
    setColor(defaults.colors.front, document.querySelector('[data-color="#E8876A"]'));
  });

  renderCover();
}