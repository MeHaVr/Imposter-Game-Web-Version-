import "./App.css";
import { useEffect, useState } from "react";
import Game from "./components/Game";
import SettingsMenu from "./components/SettingsMenu";
import Alerts from "./components/alerts";
import JavascriptTimeAgo from "javascript-time-ago";
import de from "javascript-time-ago/locale/de";

JavascriptTimeAgo.addDefaultLocale(de);

export type WordEntry = { word: string; tip: string; id: string };

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);

  const [isTimeMode, setIsTimeMode] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [tipMode, setTipMode] = useState(false);

  const [language, setlanguage] = useState("de-DE");
  const [customWords, setCustomWords] = useState<WordEntry[]>([]);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    "success" | "error" | "info" | "warning" | null
  >(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("imposter_custom_words");
      if (!raw) return;
      const parsed = JSON.parse(raw) as WordEntry[];
      if (Array.isArray(parsed)) setCustomWords(parsed);
    } catch (error) {
      console.error("Fehler beim Laden vom LocalStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "imposter_custom_words",
        JSON.stringify(customWords),
      );
    } catch (error) {
      console.error("Fehler beim Speichern im LocalStorage:", error);
    }
  }, [customWords]);

  const handleCloseAlert = () => {
    setIsError(false);
    setErrorMsg(null);
    setErrorType(null);
  };

  return (
    <div className="pulse-background fixed inset-0 w-full min-h-screen">
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
        language={language}
        setlanguage={setlanguage}
        setErrorMsg={setErrorMsg}
        setIsError={setIsError}
        setErrorType={setErrorType}
      />

      {isError && errorMsg && (
        <Alerts
          message={errorMsg}
          active={isError}
          type={errorType}
          onClose={handleCloseAlert}
        />
      )}

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
