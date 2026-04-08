import { useStore } from "@nanostores/react";
import { theme, toggleTheme, setTheme, initTheme, type Theme } from "@/stores/themeStore";

export function useTheme() {
  const currentTheme = useStore(theme);

  return {
    theme: currentTheme,
    toggle: toggleTheme,
    set: (t: Theme) => setTheme(t),
    init: initTheme,
    isDark: currentTheme === "dark",
  };
}
