import "./App.css";
import { useEffect, useState } from "react";
import Game from "./components/Game";
import SettingsMenu from "./components/SettingsMenu";
import Alerts from "./components/alerts";
import JavascriptTimeAgo from "javascript-time-ago";
import de from "javascript-time-ago/locale/de";
import imgBanner from "./assets/imgBanner.png";
import backgroundImg from "./assets/imgBg.png";

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

  // ✅ Für Web: Fullscreen API verwenden
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        }
      } catch (error) {
        console.log("Fullscreen konnte nicht aktiviert werden:", error);
      }
    };

    enterFullscreen();
  }, []);

  const handleCloseAlert = () => {
    setIsError(false);
    setErrorMsg(null);
    setErrorType(null);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none">
      {/* Hintergrundbild */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />

      {/* Content Container - touch-none verhindert ungewollte Gesten auf dem Container */}
      <div className="relative z-10 flex flex-col h-full touch-none">
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

        {/* Banner oben - select-none und pointer-events-none verhindern Interaktion */}
        <div className="flex justify-center pt-2 pb-1 select-none">
          <img
            src={imgBanner}
            alt="Imposter Game Banner"
            className="w-9/10 max-w-md h-auto object-contain drop-shadow-2xl select-none pointer-events-none"
          />
        </div>

        {/* Game Container - touch-auto erlaubt Touch-Events für Buttons */}
        <div className="flex-1 flex justify-center items-center pb-10 touch-auto">
          <Game
            timerSeconds={timerSeconds}
            tipMode={tipMode}
            customWords={customWords}
            isTimeMode={isTimeMode}
            setGameisActive={setIsGameActive}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
