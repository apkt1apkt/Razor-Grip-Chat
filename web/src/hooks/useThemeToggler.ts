import { useReactiveVar } from "@apollo/client";

import { themeVar } from "@web/reactive";

export default function useThemeToggler() {
  const mode = useReactiveVar(themeVar);
  const isDark = mode === "dark";
  const toggleMode = () => themeVar(isDark ? "light" : "dark");
  return {
    toggleMode,
    isDark,
    title: `Switch to ${isDark ? "light" : "dark"} theme`,
  };
}
