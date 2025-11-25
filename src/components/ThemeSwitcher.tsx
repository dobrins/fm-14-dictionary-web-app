import { useEffect, useState } from "react";

type Theme = "☀️" | "🌙";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved ? saved : "☀️";
  });

  const switchTheme = () => {
    setTheme((prev) => (prev === "☀️" ? "🌙" : "☀️"));
  };

  useEffect(() => {
    const isLight = theme === "☀️";

    if (!document.startViewTransition) {
      document.documentElement.style.setProperty("--theme", theme);
      return;
    }

    document.startViewTransition(() => {
      if (isLight) {
        document.documentElement.style.removeProperty("--theme");
      } else {
        document.documentElement.style.setProperty("--theme", theme);
      }
    });

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <div className="header__mode">
        <input
          id="mode"
          type="checkbox"
          className="switch-input"
          onChange={switchTheme}
        />
        <label
          className="switch"
          htmlFor="mode"
        />
        <label
          htmlFor="mode"
          className="label-moon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22">
            <path
              fill="none"
              stroke="#838383"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
            />
          </svg>
        </label>
      </div>
    </>
  );
}
