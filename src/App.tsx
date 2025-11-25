import { useEffect, useState, type FormEvent } from "react";
import { Watch } from "react-loader-spinner";
import { useDictionary } from "./hooks/useDictionary";
import Header from "./components/Header";
import Form from "./components/Form";
import Result from "./components/Result";
import Error from "./components/Error";
import type { Font } from "./types/types";

const KEYWORD = "keyword";

function App() {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem("keyword");
    return saved ? saved : KEYWORD;
  });
  const [inputValue, setInputValue] = useState(() => {
    const saved = localStorage.getItem("keyword");
    return saved ? saved : KEYWORD;
  });

  const [font, setFont] = useState<Font>(() => {
    const saved = localStorage.getItem("font");

    return saved
      ? (JSON.parse(saved) as Font)
      : { name: "Sans Serif", class: "sans-serif" };
  });

  const { data, isError, isLoading } = useDictionary(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = inputValue.trim();
    localStorage.setItem("keyword", val);
    if (val) setValue(val);
  };

  useEffect(() => {
    document.body.classList = "";
    document.body.classList.add(font.class);
  }, [font]);

  return (
    <>
      <Header
        font={font}
        setFont={setFont}
      />
      <main>
        <Form
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        {isLoading && (
          <Watch
            visible={true}
            height="160"
            width="160"
            radius="48"
            color="#979797"
            ariaLabel="watch-loading"
            wrapperClass="loader"
          />
        )}
        {isError && <Error />}
        {data && <Result data={data} />}
      </main>
    </>
  );
}

export default App;
