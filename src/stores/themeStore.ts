import { atom } from "nanostores";

export type Theme = "dark" | "light";

export const theme = atom<Theme>("dark");

export function initTheme() {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) {
    theme.set(stored);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    theme.set("light");
  }
  applyTheme(theme.get());
}

export function toggleTheme() {
  const next = theme.get() === "dark" ? "light" : "dark";
  theme.set(next);
  localStorage.setItem("theme", next);
  applyTheme(next);
}

export function setTheme(t: Theme) {
  theme.set(t);
  localStorage.setItem("theme", t);
  applyTheme(t);
}

function applyTheme(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
}
