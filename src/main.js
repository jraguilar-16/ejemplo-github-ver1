import "@picocss/pico/css/pico.min.css";
import "./styles/main.css";
import { createIcons, ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, BookOpen, Flower2, Heart, LayoutGrid, Moon, PencilLine, ShoppingBag, Sparkles, Sun, Waves } from "lucide";
import { initCollectionGrid } from "./components/collection-grid.js";
import { initCoverEditor } from "./components/cover-editor.js";
import { initDemoOrderForm } from "./components/demo-order-form.js";
import { initPreviewStateSwitcher } from "./components/preview-state-switcher.js";

const icons = { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, BookOpen, Flower2, Heart, LayoutGrid, Moon, PencilLine, ShoppingBag, Sparkles, Sun, Waves };

createIcons({ icons });
initCoverEditor();
initDemoOrderForm();
initCollectionGrid(document.querySelector("#collection-grid"));
initPreviewStateSwitcher(document.querySelector("#preview-switcher"));

const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  themeToggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}" aria-hidden="true"></i>`;
  createIcons({ icons });
});