import { useEffect, useState } from "react";

const getTheme = () => {
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
    else return "light";
  }
  return "light";
};

const useDarkMode = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.themes ? localStorage.themes : getTheme
  );
  const colorTheme = theme === "light" ? "dark" : "light";

  const checkTheme = () =>
    localStorage.themes
      ? setTheme(localStorage.themes)
      : (setTheme(getTheme()), localStorage.setItem("themes", getTheme()));

  const changeTheme = () => setTheme(colorTheme);

  useEffect(() => {
    checkTheme();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(theme);
    root.classList.remove(colorTheme);
    localStorage.setItem("themes", theme);
  }, [theme, colorTheme]);

  return changeTheme;
};

export default useDarkMode;
