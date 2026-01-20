import { useEffect, useMemo, useState } from "react";
import type { WordEntry } from "../App";

type SettingsMenuProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;

  timerSeconds: number;
  setTimerSeconds: (n: number) => void;
  isTimeMode: boolean;
  setIsTimeMode: (v: boolean) => void;
  tipMode: boolean;
  setTipMode: (v: boolean) => void;
  disabled?: boolean;
  customWords: WordEntry[];
  setCustomWords: (list: WordEntry[]) => void;
};

function SettingsMenu({
  open,
  onToggle,
  onClose,
  timerSeconds,
  setTimerSeconds,
  tipMode,
  setTipMode,
  customWords,
  setCustomWords,
  disabled,
  isTimeMode,
  setIsTimeMode,
}: SettingsMenuProps) {
  const [wordInput, setWordInput] = useState("");
  const [tipInput, setTipInput] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const cleaned = useMemo(() => {
    const word = wordInput.trim();
    const tip = tipInput.trim();
    return { word, tip };
  }, [wordInput, tipInput]);

  const canAdd = cleaned.word.length > 0 && cleaned.tip.length > 0;

  const addWord = () => {
    if (!canAdd) return;

    // prevent duplicates by word (case-insensitive)
    const exists = customWords.some(
      (w) => w.word.toLowerCase() === cleaned.word.toLowerCase()
    );
    if (exists) return;

    setCustomWords([{ word: cleaned.word, tip: cleaned.tip }, ...customWords]);
    setWordInput("");
    setTipInput("");
  };

  const removeWord = (word: string) => {
    setCustomWords(customWords.filter((w) => w.word !== word));
  };

  return (
    <>
      {/* Burger button */}
      <button
        type="button"
        onClick={disabled ? undefined : onToggle}
        disabled={disabled}
        className="
          fixed top-5 right-5 z-50 pointer-events-auto
          h-11 w-11 rounded-xl
          border border-white/10 bg-white/5 backdrop-blur-md
          shadow-lg shadow-black/20
          flex items-center justify-center
          transition hover:bg-white/10 hover:border-white/20
          active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-blue-500/60
        "
        aria-label={open ? "Close settings" : "Open settings"}
      >
        <div className="flex flex-col gap-1">
          <span className="block h-0.5 w-5 bg-white/80 rounded-full" />
          <span className="block h-0.5 w-5 bg-white/80 rounded-full" />
          <span className="block h-0.5 w-5 bg-white/80 rounded-full" />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40 transition
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-[340px]
          border-l border-white/10 bg-neutral-950/70 backdrop-blur-md
          shadow-2xl shadow-black/40
          transition-transform duration-200
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!open}
      >
        <div className="p-5 flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-widest text-white/60">
            Settings
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              h-9 w-9 rounded-xl
              border border-white/10 bg-white/5
              transition hover:bg-white/10 hover:border-white/20
              active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-blue-500/60
              text-white/80
            "
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pb-6 space-y-5">
          {/* Is timer */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Timer
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Timer deaktivieren oder aktivieren.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTimeMode(!isTimeMode)}
                className={`
                  relative h-8 w-14 rounded-full border transition
                  ${
                    isTimeMode
                      ? "bg-blue-500/60 border-blue-500/40"
                      : "bg-white/10 border-white/15"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/60
                `}
              >
                <span
                  className={`
                    absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform
                    ${isTimeMode ? "translate-x-6" : "translate-x-0"}
                  `}
                />
              </button>
            </div>
          </div>
          {isTimeMode && (
            /* Timer */
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                Timer (Sekunden)
              </div>

              <input
                type="number"
                min={10}
                step={10}
                value={timerSeconds}
                onChange={(e) => setTimerSeconds(Number(e.target.value))}
                className="
                w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white
                placeholder:text-white/40 outline-none transition
                focus:bg-white/15 focus:ring-2 focus:ring-blue-500/60
              "
              />
            </div>
          )}

          {/* Tip mode */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Tip Mode
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Imposter bekommt ein Tippwort
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTipMode(!tipMode)}
                className={`
                  relative h-8 w-14 rounded-full border transition
                  ${
                    tipMode
                      ? "bg-blue-500/60 border-blue-500/40"
                      : "bg-white/10 border-white/15"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/60
                `}
              >
                <span
                  className={`
                    absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform
                    ${tipMode ? "translate-x-6" : "translate-x-0"}
                  `}
                />
              </button>
            </div>
          </div>

          {/* ✅ Custom Words */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
              Eigene Wörter
            </div>

            <div className="space-y-2">
              <input
                value={wordInput}
                onChange={(e) => setWordInput(e.target.value)}
                placeholder="Wort (z.B. 'Pizza')"
                className="
                  w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white
                  placeholder:text-white/40 outline-none transition
                  focus:bg-white/15 focus:ring-2 focus:ring-blue-500/60
                "
              />

              <input
                value={tipInput}
                onChange={(e) => setTipInput(e.target.value)}
                placeholder="Tipp (z.B. 'Italien, Essen')"
                className="
                  w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white
                  placeholder:text-white/40 outline-none transition
                  focus:bg-white/15 focus:ring-2 focus:ring-blue-500/60
                "
              />

              <button
                type="button"
                disabled={!canAdd}
                onClick={addWord}
                className={`
                  w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition
                  ${
                    canAdd
                      ? "bg-blue-500/80 hover:bg-blue-500 text-white"
                      : "bg-gray-400 cursor-not-allowed text-white/80"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/60
                `}
              >
                Hinzufügen
              </button>
            </div>

            {/* List */}
            <div className="mt-4 space-y-2 max-h-44 overflow-auto pr-1">
              {customWords.length === 0 ? (
                <div className="text-xs text-white/40">
                  Noch keine eigenen Wörter gespeichert.
                </div>
              ) : (
                customWords.map((w) => (
                  <div
                    key={w.word}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {w.word}
                      </div>
                      <div className="text-xs text-white/50 truncate">
                        Tipp: {w.tip}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeWord(w.word)}
                      className="
                        shrink-0 rounded-md px-2 py-1 text-xs font-semibold
                        bg-white/10 border border-white/10
                        hover:bg-white/20 hover:border-white/20 transition
                        focus:outline-none focus:ring-2 focus:ring-blue-500/60
                      "
                    >
                      Entfernen
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Clear */}
            {customWords.length > 0 && (
              <button
                type="button"
                onClick={() => setCustomWords([])}
                className="
                  mt-3 w-full rounded-lg px-4 py-2 text-xs font-semibold
                  bg-white/10 border border-white/10
                  hover:bg-white/20 hover:border-white/20 transition
                  focus:outline-none focus:ring-2 focus:ring-blue-500/60
                "
              >
                Alle löschen
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default SettingsMenu;
