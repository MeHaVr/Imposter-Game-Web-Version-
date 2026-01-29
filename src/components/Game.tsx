import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import selectClassNames from "../style/selectClassNames";
import type { Option } from "../types/Options";
import WordShowCard from "./WordShowCard";
import { RandomWordEntry, RandomTip } from "../utils/WordsList";
import { pickRandomIndexes } from "../utils/pickRandomIndexes";
import GameTimer from "./GameTimer";
import type { WordsType } from "../types/WordsType";
import type { WordEntry } from "../App";
import BackButton from "./BackButton";

type GameProps = {
  timerSeconds: number;
  tipMode: boolean;
  isTimeMode: boolean;
  customWords?: WordsType[] | WordEntry[];
  setGameisActive?: (active: boolean) => void;
};

function Game({
  timerSeconds,
  tipMode,
  customWords,
  setGameisActive,
  isTimeMode,
}: GameProps) {
  const [gameState, setGameState] = useState<
    "Start" | "ShowingCards" | "Timer" | "GameOver"
  >("Start");

  const [crew, setCrew] = useState<Option | null>(null);
  const [imposters, setImposters] = useState<Option | null>(null);

  const [crewCount, setCrewCount] = useState<number>(3);
  const [imposterCount, setImposterCount] = useState<number>(1);

  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [imposterOptions, setImposterOptions] = useState<Option[]>([
    { value: "1", label: "1 Imposter" },
  ]);

  // Card state
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [wordEntry, setWordEntry] = useState<WordsType | null>(null);
  const [tipWord, setTipWord] = useState<string>("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Next enabled after delay
  const [canGoNext, setCanGoNext] = useState(false);

  // Imposters by index
  const [imposterIndexes, setImposterIndexes] = useState<Set<number>>(
    new Set(),
  );

  const CrewOptions: Option[] = [
    { value: "3", label: "3 Mitspieler" },
    { value: "4", label: "4 Mitspieler" },
    { value: "5", label: "5 Mitspieler" },
    { value: "6", label: "6 Mitspieler" },
    { value: "7", label: "7 Mitspieler" },
    { value: "8", label: "8 Mitspieler" },
    { value: "9", label: "9 Mitspieler" },
  ];

  useEffect(() => {
    setGameisActive?.(gameState !== "Start");
  }, [gameState, setGameisActive]);

  useEffect(() => {
    if (crewCount <= 3) {
      setImposterOptions([{ value: "1", label: "1 Imposter" }]);
    } else if (crewCount <= 5) {
      setImposterOptions([
        { value: "1", label: "1 Imposter" },
        { value: "2", label: "2 Imposter" },
      ]);
    } else {
      setImposterOptions([
        { value: "1", label: "1 Imposter" },
        { value: "2", label: "2 Imposter" },
        { value: "3", label: "3 Imposter" },
      ]);
    }
  }, [crewCount]);

  useEffect(() => {
    setPlayerNames((prev) =>
      prev
        .slice(0, crewCount)
        .concat(Array(Math.max(0, crewCount - prev.length)).fill("")),
    );
  }, [crewCount]);

  useEffect(() => {
    if (
      imposters &&
      !imposterOptions.some((o) => o.value === imposters.value)
    ) {
      setImposters(null);
      setImposterCount(1);
    }
  }, [imposterOptions, imposters]);

  const allNamesFilled = useMemo(
    () =>
      playerNames.length === crewCount &&
      playerNames.every((n) => n.trim().length > 0),
    [playerNames, crewCount],
  );

  const canStart = !!crew && !!imposters && allNamesFilled;

  const safeCustomWords: WordsType[] | undefined = (customWords as any)?.map(
    (w: any) => {
      if (Array.isArray(w?.tips))
        return { word: String(w.word), tips: w.tips.map(String) };
      if (typeof w?.tip === "string")
        return { word: String(w.word), tips: [w.tip] };
      return { word: String(w?.word ?? "word"), tips: ["hint"] };
    },
  );

  /* ================= START SCREEN ================= */
  if (gameState === "Start") {
    return (
      <div className="flex flex-col items-center text-black mx-5">
        <h3 className="text-xl font-bold mb-4 text-white">
          Spieloptionen auswählen
        </h3>

        <div className="w-full space-y-4">
          {/* Crew */}
          <div className="group relative rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/70">
              Spieler
            </label>

            <Select
              options={CrewOptions}
              isSearchable={false}
              isClearable={false}
              value={crew}
              unstyled
              classNames={selectClassNames}
              onChange={(selected) => {
                setCrew(selected);
                setCrewCount(Number(selected?.value));
              }}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </div>

          {/* Imposters */}
          {crew && (
            <div className="group relative rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/70">
                Imposters
              </label>

              <Select
                options={imposterOptions}
                isSearchable={false}
                isClearable={false}
                value={imposters}
                unstyled
                classNames={selectClassNames}
                onChange={(selected) => {
                  setImposters(selected);
                  setImposterCount(Number(selected?.value));
                }}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </div>
          )}
          {/* Player names */}
          {crew && imposters && (
            <div className="space-y-2">
              {Array.from({ length: crewCount }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="
                    w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white
                    placeholder:text-white/40 outline-none
                    focus:bg-white/15 focus:ring-2 focus:ring-blue-500/60
                  "
                  placeholder={`Spieler ${index + 1} Name`}
                  value={playerNames[index] || ""}
                  onChange={(e) => {
                    const updated = [...playerNames];
                    updated[index] = e.target.value;
                    setPlayerNames(updated);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button
          disabled={!canStart}
          className={`touch-manipulation 
  active:scale-95 
  transition-transform 
  select-none mt-6 px-6 py-2.5 rounded-xl font-semibold ${
    canStart
      ? "bg-blue-500 hover:bg-blue-700 text-white"
      : "bg-gray-400 cursor-not-allowed text-white/80"
  }`}
          onClick={() => {
            const imposterIdx = pickRandomIndexes(
              playerNames.length,
              imposterCount,
            );

            const entry = RandomWordEntry(safeCustomWords);
            const tip = RandomTip(entry);

            setImposterIndexes(new Set(imposterIdx));
            setWordEntry(entry);
            setTipWord(tip);

            setCurrentPlayerIndex(0);
            setIsWordVisible(false);
            setCanGoNext(false);

            setGameState("ShowingCards");
          }}
        >
          Start Game
        </button>
      </div>
    );
  }

  /* ================= SHOWING CARDS ================= */
  if (gameState === "ShowingCards") {
    const isLastPlayer = currentPlayerIndex >= playerNames.length - 1;
    const isImposter = imposterIndexes.has(currentPlayerIndex);

    // ✅ FIX: Imposter ALWAYS sees "IMPOSTER"
    const wordForPlayer = isImposter ? "IMPOSTER" : (wordEntry?.word ?? "");

    return (
      <div className="text-white flex flex-col items-center gap-6">
        {/* ✅ Back button (burger-like) */}
        <BackButton onClick={() => setGameState("Start")} />

        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-white/50">
            Spieler {currentPlayerIndex + 1} / {playerNames.length}
          </div>
          <h1 className="text-2xl font-bold mt-2">
            {playerNames[currentPlayerIndex]}
          </h1>
        </div>

        <WordShowCard
          isVisible={isWordVisible}
          word={wordForPlayer}
          onToggle={() => {
            if (isWordVisible) return;

            setIsWordVisible(true);
            setCanGoNext(false);

            window.setTimeout(() => setCanGoNext(true), 350);
          }}
          onBack={() => setGameState("Start")}
          isTipword={tipMode && isImposter}
          tipWord={tipWord}
        />

        <button
          type="button"
          disabled={!canGoNext}
          className={`touch-manipulation 
  active:scale-95 
  transition-transform 
  select-none px-6 py-2.5 rounded-xl font-semibold ${
    canGoNext
      ? "bg-blue-500 hover:bg-blue-600 text-white"
      : "bg-gray-400 cursor-not-allowed text-white/80"
  }`}
          onClick={() => {
            if (!canGoNext) return;

            setIsWordVisible(false);
            setCanGoNext(false);

            if (isLastPlayer) {
              setGameState("Timer");
            } else {
              setCurrentPlayerIndex((i) => i + 1);
            }
          }}
        >
          {isLastPlayer ? "Fertig" : "Nächster Spieler"}
        </button>
      </div>
    );
  }

  /* ================= TIMER ================= */
  if (gameState === "Timer") {
    const handleTimerEnd = () => setGameState("GameOver");

    if (!isTimeMode) {
      return (
        <div className="flex flex-col items-center gap-4">
          <BackButton onClick={() => setGameState("Start")} />

          <button
            type="button"
            onClick={handleTimerEnd}
            className="
            touch-manipulation 
  active:scale-95 
  transition-transform 
  select-none
              w-72 rounded-xl px-4 py-2.5
              font-semibold text-white
              bg-white/10 backdrop-blur-md
              border border-white/10
              shadow-md shadow-black/20
              
              hover:bg-white/20 hover:border-white/20
              active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-blue-500/60
            "
          >
            Aufdecken
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-4">
        <BackButton onClick={() => setGameState("Start")} />

        <GameTimer seconds={timerSeconds} onEnd={handleTimerEnd} />

        <button
          type="button"
          onClick={handleTimerEnd}
          className="
          touch-manipulation 
  active:scale-95 
  transition-transform 
  select-none
            w-72 rounded-xl px-4 py-2.5
            font-semibold text-white
            bg-white/10 backdrop-blur-md
            border border-white/10
            shadow-md shadow-black/20
            
            hover:bg-white/20 hover:border-white/20
            active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-blue-500/60
          "
        >
          Timer überspringen
        </button>
      </div>
    );
  }

  /* ================= GAME OVER ================= */
  if (gameState === "GameOver") {
    return (
      <div className="flex flex-col items-center gap-6 text-white">
        <BackButton onClick={() => setGameState("Start")} />

        <h2 className="text-3xl font-bold tracking-wide">Spiel vorbei</h2>

        <div className="text-center text-white/70">Das gesuchte Wort war</div>

        <WordShowCard
          isVisible={true}
          isEndScreen={true}
          word={wordEntry?.word ?? ""}
          onToggle={() => {}}
          onBack={() => setGameState("Start")}
          isTipword={false}
          tipWord={tipWord}
        />

        <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50 text-center">
            Imposter
          </div>

          <ul className="space-y-1 text-center">
            {playerNames.map((name, index) =>
              imposterIndexes.has(index) ? (
                <li key={index} className="font-semibold text-red-400">
                  {name}
                </li>
              ) : null,
            )}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setGameState("Start")}
          className="
          touch-manipulation 
  active:scale-95 
  transition-transform 
  select-none
            mt-2 rounded-xl px-6 py-2.5
            font-semibold text-white
            bg-blue-500/80
            hover:bg-blue-500
            
            focus:outline-none focus:ring-2 focus:ring-blue-500/60
          "
        >
          Neues Spiel
        </button>
      </div>
    );
  }

  return null;
}

export default Game;
