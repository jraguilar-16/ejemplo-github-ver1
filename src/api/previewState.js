const states = new Set(["data", "loading", "empty", "error"]);
const listeners = new Set();
const isDevelopment = import.meta.env.DEV;
const queryState = new URLSearchParams(window.location.search).get("previewState");
const storedState = window.localStorage.getItem("previewState");
let currentState = isDevelopment && states.has(queryState) ? queryState
  : isDevelopment && states.has(storedState) ? storedState
    : "data";

export function getPreviewState() {
  return isDevelopment ? currentState : "data";
}

export function setPreviewState(nextState) {
  if (!isDevelopment || !states.has(nextState)) return;
  currentState = nextState;
  window.localStorage.setItem("previewState", nextState);
  listeners.forEach((listener) => listener(nextState));
}

export function subscribeToPreviewState(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}