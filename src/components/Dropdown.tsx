import { useState, useRef, useEffect } from "react";
import type { Font } from "../types/types";

type DropdownProps = {
  label: string;
  onSelect: (value: Font) => void;
  active: string;
};

const OPTIONS: Font[] = [
  {
    name: "Sans Serif",
    class: "sans-serif",
  },
  {
    name: "Serif",
    class: "serif",
  },
  {
    name: "Mono",
    class: "mono",
  },
];

export default function Dropdown({ label, onSelect, active }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(active);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Font) => {
    setSelected(option.name);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="dropdown"
      ref={dropdownRef}>
      <button
        className="dropdown__btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}>
        {selected ?? label}
        <svg
          className={`dropdown__icon ${isOpen && "dropdown__icon--open"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="8"
          viewBox="0 0 14 8">
          <path
            fill="none"
            stroke="#A445ED"
            strokeWidth="1.5"
            d="m1 1 6 6 6-6"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          {OPTIONS.map((option) => (
            <li
              key={option.class}
              className={`dropdown__item ${option.class}`}
              onClick={() => handleSelect(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
