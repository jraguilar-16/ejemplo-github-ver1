const defaults = {
  title: "mis ideas bonitas",
  subtitle: "un lugar para todo lo que imagino",
  author: "hecha por mí",
  color: "#E9A894",
  style: "plain",
};

const state = {
  side: "front",
  color: defaults.color,
  style: defaults.style,
  photoUrl: "",
  photoOnBoth: true,
  stickers: { front: [], back: [] },
};

const titleInput = document.querySelector("#cover-title");
const subtitleInput = document.querySelector("#cover-subtitle");
const authorInput = document.querySelector("#cover-author");
const styleSelect = document.querySelector("#cover-style");
const customColor = document.querySelector("#custom-color");
const photoInput = document.querySelector("#photo-upload");
const uploadMessage = document.querySelector("#upload-message");
const applyToBoth = document.querySelector("#apply-to-both");
const formResult = document.querySelector("#form-result");
const covers = {
  front: document.querySelector("#front-cover"),
  back: document.querySelector("#back-cover"),
};
let currentObjectUrl = "";

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderCover() {
  const title = titleInput.value.trim() || defaults.title;
  const subtitle = subtitleInput.value.trim();
  const author = authorInput.value.trim() || defaults.author;
  const lines = escapeHtml(title).replace(/\s+/g, " ").split(" ");
  const titleMarkup = lines.length > 2
    ? `${lines.slice(0, 2).join(" ")}<br>${lines.slice(2).join(" ")}`
    : lines.join("<br>");

  document.querySelector("#preview-title").innerHTML = titleMarkup;
  document.querySelector("#preview-subtitle").textContent = subtitle;
  document.querySelector("#preview-subtitle").hidden = !subtitle;
  document.querySelector("#preview-author").textContent = author;
  document.querySelector("#back-author").textContent = author;
  document.querySelectorAll(".book-cover").forEach((cover) => {
    cover.style.setProperty("--cover-color", state.color);
    cover.className = `book-cover ${cover.id === "front-cover" ? "front-cover" : "back-cover"} cover-pattern-${state.style}`;
    const showPhoto = state.photoUrl && (state.photoOnBoth || (cover.id === `${state.side}-cover`));
    if (showPhoto) {
      cover.classList.add("has-photo");
      cover.querySelector(".cover-photo").style.backgroundImage = `url("${state.photoUrl}")`;
    } else {
      cover.querySelector(".cover-photo").style.backgroundImage = "";
    }
    if (state.side === (cover.id === "front-cover" ? "front" : "back")) {
      cover.classList.add("is-active");
    }
    cover.querySelector(".cover-stickers").innerHTML = state.stickers[cover.id === "front-cover" ? "front" : "back"]
      .map((sticker, index) => `<span class="sticker sticker-${index}">${escapeHtml(sticker)}</span>`)
      .join("");
  });
  document.querySelectorAll(".sticker-button").forEach((button) => {
    button.classList.toggle("is-selected", state.stickers[state.side].includes(button.dataset.sticker));
    button.setAttribute("aria-pressed", String(state.stickers[state.side].includes(button.dataset.sticker)));
  });
  document.querySelectorAll(".side-button").forEach((button) => {
    const selected = button.dataset.side === state.side;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

[titleInput, subtitleInput, authorInput].forEach((input) => input.addEventListener("input", renderCover));

document.querySelectorAll(".side-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.side = button.dataset.side;
    renderCover();
  });
});

document.querySelectorAll(".color-swatch").forEach((button) => {
  button.addEventListener("click", () => setColor(button.dataset.color, button));
});

function setColor(color, selectedButton) {
  state.color = color;
  document.querySelectorAll(".color-swatch").forEach((button) => {
    const selected = button === selectedButton;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  customColor.value = color;
  renderCover();
}

customColor.addEventListener("input", () => setColor(customColor.value.toUpperCase(), null));
styleSelect.addEventListener("change", () => {
  state.style = styleSelect.value;
  renderCover();
});

document.querySelectorAll(".inspiration-card").forEach((button) => {
  button.addEventListener("click", () => {
    const preset = button.dataset.preset;
    styleSelect.value = preset;
    state.style = preset;
    const presetColors = { floral: "#E9A894", sky: "#AFCBD0", sun: "#EED58A", minimal: "#B9C9B6" };
    const swatch = [...document.querySelectorAll(".color-swatch")].find((item) => item.dataset.color === presetColors[preset]);
    setColor(presetColors[preset], swatch ?? null);
    document.querySelector("#disenador").scrollIntoView({ behavior: "smooth" });
  });
});

applyToBoth.addEventListener("change", () => {
  state.photoOnBoth = applyToBoth.checked;
  renderCover();
});

photoInput.addEventListener("change", () => {
  const [file] = photoInput.files;
  uploadMessage.textContent = "";
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    uploadMessage.textContent = "Elige un archivo de imagen válido.";
    photoInput.value = "";
    return;
  }
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  currentObjectUrl = URL.createObjectURL(file);
  state.photoUrl = currentObjectUrl;
  uploadMessage.textContent = `Foto lista: ${file.name}`;
  renderCover();
});

document.querySelectorAll(".sticker-button").forEach((button) => {
  button.addEventListener("click", () => {
    const stickers = state.stickers[state.side];
    const index = stickers.indexOf(button.dataset.sticker);
    if (index >= 0) stickers.splice(index, 1);
    else if (stickers.length < 5) stickers.push(button.dataset.sticker);
    renderCover();
  });
});

document.querySelector("#reset-design").addEventListener("click", () => {
  titleInput.value = defaults.title;
  subtitleInput.value = defaults.subtitle;
  authorInput.value = defaults.author;
  styleSelect.value = defaults.style;
  state.side = "front";
  state.style = defaults.style;
  state.photoOnBoth = true;
  state.stickers = { front: [], back: [] };
  applyToBoth.checked = true;
  photoInput.value = "";
  uploadMessage.textContent = "";
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  currentObjectUrl = "";
  state.photoUrl = "";
  const defaultSwatch = [...document.querySelectorAll(".color-swatch")].find((button) => button.dataset.color === defaults.color);
  setColor(defaults.color, defaultSwatch);
});

document.querySelector("#order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const firstName = document.querySelector("#first-name").value.trim();
  formResult.textContent = `¡Gracias, ${firstName}! Tu diseño quedó listo. Este sitio es una demostración: no se envió tu pedido ni tus datos.`;
  formResult.hidden = false;
});

window.addEventListener("beforeunload", () => {
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
});

renderCover();
