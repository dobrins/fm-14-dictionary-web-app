import type { FormEvent } from "react";

interface PassedProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setInputValue: (e: string) => void;
  inputValue: string;
}

const Form = ({ handleSubmit, setInputValue, inputValue }: PassedProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="form">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a word"
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18">
          <path
            fill="none"
            stroke="#A445ED"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default Form;
