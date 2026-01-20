import "./App.css";
import { useEffect, useState } from "react";
import Game from "./components/Game";
import SettingsMenu from "./components/SettingsMenu";

export type WordEntry = { word: string; tip: string };

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);

  const [isTimeMode, setIsTimeMode] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [tipMode, setTipMode] = useState(false);

  // ✅ Custom word list
  const [customWords, setCustomWords] = useState<WordEntry[]>([]);

  // ✅ Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("imposter_custom_words");
      if (!raw) return;
      const parsed = JSON.parse(raw) as WordEntry[];
      if (Array.isArray(parsed)) setCustomWords(parsed);
    } catch {
      // ignore broken storage
    }
  }, []);

  // ✅ Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("imposter_custom_words", JSON.stringify(customWords));
  }, [customWords]);

  return (
    <div className="pulse-background fixed inset-0 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-center text-slate-50 pt-10 m-0">
        Imposter Game
      </h1>

      <SettingsMenu
        open={settingsOpen}
        onToggle={() => setSettingsOpen((v) => !v)}
        onClose={() => setSettingsOpen(false)}
        timerSeconds={timerSeconds}
        setTimerSeconds={setTimerSeconds}
        tipMode={tipMode}
        setTipMode={setTipMode}
        customWords={customWords}
        setCustomWords={setCustomWords}
        disabled={isGameActive}
        isTimeMode={isTimeMode}
        setIsTimeMode={setIsTimeMode}
      />

      <div className="flex justify-center items-center h-screen">
        <Game
          timerSeconds={timerSeconds}
          tipMode={tipMode}
          customWords={customWords}
          isTimeMode={isTimeMode}
          setGameisActive={setIsGameActive}
        />
      </div>
    </div>
  );
}

export default App;
