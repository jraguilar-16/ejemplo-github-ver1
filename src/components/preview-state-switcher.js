import { getPreviewState, setPreviewState } from "../api/previewState.js";

export function initPreviewStateSwitcher(container) {
  if (!import.meta.env.DEV) return;

  const label = document.createElement("label");
  label.htmlFor = "preview-state-select";
  label.textContent = "Vista";
  const select = document.createElement("select");
  select.id = "preview-state-select";
  select.setAttribute("aria-label", "Estado de los diseños");
  ["data", "loading", "empty", "error"].forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = { data: "Datos", loading: "Carga", empty: "Vacío", error: "Error" }[state];
    select.append(option);
  });
  select.value = getPreviewState();
  select.addEventListener("change", () => setPreviewState(select.value));
  container.append(label, select);
  container.hidden = false;
}