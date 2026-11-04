export function createDemoOrderSummary(formData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    accent: String(formData.get("accent") ?? "Terracota").trim(),
    note: String(formData.get("note") ?? "").trim() || "Sin dedicatoria",
    product: "Libreta A5 de tapa dura",
    quantity: Math.min(10, Math.max(1, Number(formData.get("quantity")) || 1)),
    total: 24 * Math.min(10, Math.max(1, Number(formData.get("quantity")) || 1)),
  };
}

export function initDemoOrderForm() {
  const form = document.querySelector("#order-form");
  const result = document.querySelector("#form-result");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const summary = createDemoOrderSummary(new FormData(form));
    result.textContent = `Resumen de demostración para ${summary.name} (${summary.email}): ${summary.product}, acento ${summary.accent}, cantidad ${summary.quantity}, $${summary.total.toFixed(2)}. Nota: ${summary.note}. No se envió ni se guardó ningún dato.`;
    result.hidden = false;
  });
}