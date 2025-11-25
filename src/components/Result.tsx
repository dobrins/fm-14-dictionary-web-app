import type { WordEntry } from "../types/types";
import Player from "./Player";

interface PassedProps {
  data: WordEntry;
}

const Result = ({ data }: PassedProps) => {
  const link = data
    ? data.sourceUrls.slice(-1).map((item) => item)[0]
    : undefined;

  return (
    <div className="result">
      <div className="result__heading">
        <h1 className="txt-heading-l">{data.word}</h1>
        <h2 className="txt-heading-m txt-purple">{data.phonetic}</h2>
        {data.phonetics &&
          data.phonetics
            .filter((p) => p.audio!.trim())
            .slice(0, 1)
            .map((p) => (
              <Player
                url={p.audio!}
                key={p.audio}
              />
            ))}
      </div>

      <div className="result__meanings">
        {data.meanings?.map((m, i) => (
          <div key={i}>
            <h3 className="result__part-of-speech">{m.partOfSpeech}</h3>
            <h4 className="result__meaning">Meaning</h4>
            <ul>
              {m.definitions.map((i, index) => (
                <li key={index}>
                  {i.definition}
                  {i.example && (
                    <span className="txt-neutral-500">“{i.example}”</span>
                  )}
                </li>
              ))}
            </ul>
            {Array.isArray(m.synonyms) && m.synonyms.length > 0 && (
              <div className="result__synonyms">
                <span>Synonyms</span>
                <strong className="txt-purple">{m.synonyms.join(", ")}</strong>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="result__source">
        <span> Source:</span>{" "}
        <a href={link}>
          {data.sourceUrls.slice(0, 1).map((item) => item)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14">
            <path
              fill="none"
              stroke="#757575"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Result;
