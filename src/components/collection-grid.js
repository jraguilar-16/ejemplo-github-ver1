import { createIcons, BookOpen, PencilLine, TriangleAlert } from "lucide";
import { api } from "../api/index.js";
import { getPreviewState, subscribeToPreviewState } from "../api/previewState.js";

const icons = { BookOpen, PencilLine, TriangleAlert };

function renderMessage(container, { icon, title, body, action, isError = false }) {
  const state = document.createElement("div");
  state.className = `collection-state${isError ? " is-error" : ""}`;
  state.setAttribute(isError ? "role" : "aria-live", isError ? "alert" : "polite");
  state.innerHTML = `<i data-lucide="${icon}" aria-hidden="true"></i>`;
  const heading = document.createElement("strong");
  heading.textContent = title;
  const description = document.createElement("span");
  description.textContent = body;
  state.append(heading, description);

  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;
    button.addEventListener("click", action.onClick);
    state.append(button);
  }

  container.replaceChildren(state);
  container.setAttribute("aria-busy", "false");
  createIcons({ icons });
}

function renderCollections(container, items) {
  if (!items.length) {
    renderMessage(container, {
      icon: "book-open",
      title: "Aún no hay diseños en esta colección",
      body: "Empieza con una libreta en blanco y crea una portada propia.",
      action: { label: "Diseñar una libreta", onClick: () => { window.location.hash = "disenador"; } },
    });
    return;
  }

  const cards = items.map((item) => {
    const card = document.createElement("article");
    card.className = "collection-card";
    const image = document.createElement("img");
    image.className = "collection-image";
    image.src = item.image;
    image.alt = `Ilustración de ${item.title}`;
    image.loading = "lazy";
    const content = document.createElement("div");
    content.className = "collection-content";
    const title = document.createElement("h3");
    title.textContent = item.title;
    const description = document.createElement("p");
    description.textContent = item.description;
    const meta = document.createElement("div");
    meta.className = "collection-meta";
    const details = document.createElement("span");
    details.textContent = `${item.format} · ${item.paper}`;
    const price = document.createElement("strong");
    price.textContent = `$${item.price.toFixed(2)}`;
    const link = document.createElement("a");
    link.className = "collection-action";
    link.href = "#disenador";
    link.dataset.preset = item.preset;
    link.dataset.color = item.color;
    link.innerHTML = '<i data-lucide="pencil-line" aria-hidden="true"></i> Personalizar diseño';
    meta.append(details, price);
    content.append(title, description, meta, link);
    card.append(image, content);
    return card;
  });
  container.replaceChildren(...cards);
  container.setAttribute("aria-busy", "false");
  createIcons({ icons });
}

export function initCollectionGrid(container) {
  let requestId = 0;

  async function loadCollections() {
    const activeRequest = ++requestId;
    container.setAttribute("aria-busy", "true");
    if (getPreviewState() === "loading") {
      container.innerHTML = '<div class="collection-skeleton" aria-hidden="true"></div><div class="collection-skeleton" aria-hidden="true"></div><div class="collection-skeleton" aria-hidden="true"></div>';
    }

    try {
      const items = await api.getCollections();
      if (activeRequest === requestId) renderCollections(container, items);
    } catch (error) {
      if (activeRequest !== requestId) return;
      renderMessage(container, {
        icon: "triangle-alert",
        title: "No se pudo preparar la colección",
        body: error instanceof Error ? error.message : "Intenta cargar los diseños de nuevo.",
        action: { label: "Intentar de nuevo", onClick: loadCollections },
        isError: true,
      });
    }
  }

  const unsubscribe = subscribeToPreviewState(loadCollections);
  loadCollections();
  return unsubscribe;
}