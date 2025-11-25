import { useRef, useState } from "react";

interface PassedProps {
  url: string;
}

const Player = ({ url }: PassedProps) => {
  const ref = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"play" | "stop">("play");

  const toggle = async () => {
    const a = ref.current!;
    if (!a.paused) {
      a.pause();
      a.currentTime = 0;
      setState("play");
    } else {
      try {
        await a.play();
        setState("stop");
      } catch {
        // Ignore audio playback errors
      }
    }
  };

  return (
    <>
      <button
        className={`player-button player-button--${state}`}
        onClick={toggle}
        aria-label={state}></button>
      <audio
        ref={ref}
        preload="none"
        src={url}
        onEnded={() => setState("play")}
      />
    </>
  );
};

export default Player;
