import type { Font } from "../types/types";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "./ThemeSwitcher";

interface PassedProps {
  font: Font;
  setFont: (a: Font) => void;
}

const Header = ({ font, setFont }: PassedProps) => {
  return (
    <header className="header">
      <img
        className="logo"
        src="/logo.svg"
        alt=""
        width={32}
      />
      <Dropdown
        label="Filter by region"
        active={font.name}
        onSelect={(value) => {
          setFont(value);
          localStorage.setItem("font", JSON.stringify(value));
        }}
      />
      <div className="divider" />

      <ThemeSwitcher />
    </header>
  );
};

export default Header;
