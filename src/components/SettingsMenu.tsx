import { useEffect, useMemo, useState } from "react";
import type { WordEntry } from "../App";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";

import type { WordSetListItem, WordSetDetail } from "../types/WordsSets";

import Select from "react-select";
import selectClassNames from "../style/selectClassNames";
import { languageOptions } from "../types/Options";
import type { LanguageOption } from "../types/Options";
import type { UploadWord } from "../types/Options";
import { Spoiler } from "spoiled";
import UploadSet from "./settings/UploadSet";

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

  language: string;
  setlanguage: (lang: string) => void;
};

type WordEntryWithSource = WordEntry & { sourceSetId?: string };

// Browser-safe id generator
const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

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
  language,
  setlanguage,
}: SettingsMenuProps) {
  const [wordInput, setWordInput] = useState("");
  const [tipInput, setTipInput] = useState("");
  const [privatCode, setPrivatCode] = useState("");
  const [wordSets, setWordSets] = useState<WordSetListItem[]>([]);
  const [activeSetId, setActiveSetId] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const MAX_VISIBLE_WORDSETS = 5;
  const [showAllWordSets, setShowAllWordSets] = useState(false);

  // "true" = show real words; "false" = hide with spoiler
  const [isImposterWordVisible, setIsImposterWordVisible] = useState(true);

  // Upload popup
  const [showUploadSet, setShowUploadSet] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Prevent background scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const cleaned = useMemo(() => {
    const word = wordInput.trim();
    const tip = tipInput.trim();
    return { word, tip };
  }, [wordInput, tipInput]);

  const canAdd = cleaned.word.length > 0 && cleaned.tip.length > 0;

  const addCustomWord = () => {
    if (!canAdd) return;

    const exists = customWords.some(
      (w) => w.word.toLowerCase() === cleaned.word.toLowerCase(),
    );
    if (exists) return;

    const newEntry: WordEntryWithSource = {
      id: makeId(),
      word: cleaned.word,
      tip: cleaned.tip,
      sourceSetId: undefined,
    };

    setCustomWords([newEntry as WordEntry, ...customWords]);
    setWordInput("");
    setTipInput("");
  };

  const removeWord = (word: string) => {
    setCustomWords(customWords.filter((w) => w.word !== word));
  };

  // Remove ONLY words that came from THIS set id
  const removeWordsFromSet = (id: string) => {
    const filtered = (customWords as WordEntryWithSource[]).filter(
      (w) => w.sourceSetId !== id,
    );
    setCustomWords(filtered as WordEntry[]);
    if (activeSetId === id) setActiveSetId(null);
  };

  const addWordsFromSet = async (id: string) => {
    try {
      const response = await axios.get<WordSetDetail>(
        `http://localhost:4000/api/word-sets/${id}`,
      );
      const wordSet = response.data;

      // Prevent duplicates by word (case-insensitive)
      const existing = new Set(customWords.map((w) => w.word.toLowerCase()));

      const newWords: WordEntryWithSource[] = wordSet.words
        .filter((w) => !existing.has(w.word.toLowerCase()))
        .map((w) => ({
          id: makeId(),
          word: w.word,
          tip: w.tips?.[0] ?? "",
          sourceSetId: id,
        }));

      setCustomWords([...(newWords as WordEntry[]), ...customWords]);
      setActiveSetId(id);
    } catch (error) {
      console.error("Error fetching word set:", error);
    }
  };

  // Fetch word sets (only when menu opens)
  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const response = await axios.get<WordSetListItem[]>(
          "http://localhost:4000/api/word-sets",
        );
        setWordSets(response.data);
      } catch (error) {
        console.error("Error fetching word sets:", error);
      }
    })();
  }, [open]);

  const visibleWordSets = showAllWordSets
    ? wordSets
    : wordSets.slice(0, MAX_VISIBLE_WORDSETS);

  const redeemPrivatCode = async () => {
    if (privatCode.length !== 5 || isRedeeming) return;

    setIsRedeeming(true);
    setRedeemError(null);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/word-sets/privat/redeem/",
        { privatCode },
      );

      const set = res.data?.set;
      if (!set || !Array.isArray(set.words)) {
        throw new Error("Invalid backend response");
      }

      const newWords = set.words.map((w: any) => ({
        id: crypto.randomUUID(),
        word: w.word,
        tip: w.tips?.[0] ?? "",
        sourceSetId: set.id,
      }));

      setCustomWords(newWords as WordEntry[]);
    } catch (err: any) {
      setRedeemError(err?.response?.data?.error ?? "Einlösen fehlgeschlagen.");
    } finally {
      setIsRedeeming(false);
    }
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
          h-11 w-11 rounded-xl border border-white/10 bg-white/5
          backdrop-blur-md shadow-lg shadow-black/20
          flex items-center justify-center transition
          hover:bg-white/10 hover:border-white/20
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
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Drawer (mobile-friendly + scrollable content) */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-dvh
          w-full sm:w-[400px]
          border-l border-white/10 bg-neutral-950/70
          backdrop-blur-md shadow-2xl shadow-black/40
          transition-transform duration-200
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="text-sm font-semibold uppercase tracking-widest text-white/60">
            Settings
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              h-9 w-9 rounded-xl border border-white/10 bg-white/5 transition
              hover:bg-white/10 hover:border-white/20 active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-blue-500/60 text-white/80
            "
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        {/* Scroll area */}
        <div
          className="
            px-5 pt-5 pb-6 space-y-5
            overflow-y-auto overscroll-contain flex-1
            [scrollbar-gutter:stable]
          "
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
          }}
        >
          {/* Sprache */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
              Sprache
            </div>

            <Select<LanguageOption, false>
              options={languageOptions}
              isSearchable={false}
              isClearable={false}
              unstyled
              classNames={selectClassNames}
              value={languageOptions.find((o) => o.value === language) ?? null}
              onChange={(selected) => {
                if (!selected) return;
                setlanguage(selected.value);
              }}
            />
          </div>

          {/* Timer toggle */}
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
                  ${isTimeMode ? "bg-blue-500/60 border-blue-500/40" : "bg-white/10 border-white/15"}
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
                  Imposter bekommt ein Tippwort.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTipMode(!tipMode)}
                className={`
                  relative h-8 w-14 rounded-full border transition
                  ${tipMode ? "bg-blue-500/60 border-blue-500/40" : "bg-white/10 border-white/15"}
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

          {/* Imposter Wörter Anzeigen */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  Imposter Wörter anzeigen?
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Blendet Wörter & Tipps in der Liste ein/aus.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsImposterWordVisible((v) => !v)}
                className={`
                  relative h-8 w-14 rounded-full border transition
                  ${isImposterWordVisible ? "bg-blue-500/60 border-blue-500/40" : "bg-white/10 border-white/15"}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/60
                `}
              >
                <span
                  className={`
                    absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform
                    ${isImposterWordVisible ? "translate-x-6" : "translate-x-0"}
                  `}
                />
              </button>
            </div>
          </div>

          {/* Custom Words */}
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
                onClick={addCustomWord}
                className={`
                  w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition
                  ${canAdd ? "bg-blue-500/80 hover:bg-blue-500 text-white" : "bg-gray-400 cursor-not-allowed text-white/80"}
                  focus:outline-none focus:ring-2 focus:ring-blue-500/60
                `}
              >
                Hinzufügen
              </button>
            </div>

            <div className="mt-4 space-y-2 max-h-44 overflow-auto pr-1">
              {customWords.length === 0 ? (
                <div className="text-xs text-white/40">
                  Noch keine eigenen Wörter gespeichert.
                </div>
              ) : (
                (customWords as WordEntryWithSource[]).map((w) => (
                  <div
                    key={(w as any).id ?? w.word}
                    className="
                      rounded-lg border border-white/10 bg-white/5
                      px-3 py-2 flex items-start justify-between gap-3
                    "
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        <Spoiler
                          hidden={!isImposterWordVisible}
                          mimicWords={false}
                        >
                          {w.word}
                        </Spoiler>
                      </div>

                      <div className="text-xs text-white/50 truncate">
                        Tipp:{" "}
                        <Spoiler
                          hidden={!isImposterWordVisible}
                          mimicWords={false}
                        >
                          {w.tip}
                        </Spoiler>
                      </div>

                      {(w as WordEntryWithSource).sourceSetId && (
                        <div className="text-[10px] text-white/35 truncate">
                          Quelle: Set
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeWord(w.word)}
                      className="
                        shrink-0 rounded-md px-2 py-1 text-xs font-semibold
                        bg-white/10 border border-white/10 hover:bg-white/20
                        hover:border-white/20 transition
                        focus:outline-none focus:ring-2 focus:ring-blue-500/60
                      "
                    >
                      Entfernen
                    </button>
                  </div>
                ))
              )}
            </div>

            {customWords.length > 0 && (
              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setCustomWords([]);
                    setActiveSetId(null);
                  }}
                  className="
                    w-full rounded-lg px-4 py-2 text-xs font-semibold
                    bg-white/10 border border-white/10 hover:bg-white/20
                    hover:border-white/20 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-500/60
                  "
                >
                  Alle löschen
                </button>

                <button
                  type="button"
                  onClick={() => setShowUploadSet(true)}
                  className="
                    w-full rounded-lg px-4 py-2 text-xs font-semibold
                    bg-white/10 border border-white/10 hover:bg-white/20
                    hover:border-white/20 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-500/60
                  "
                >
                  Set hochladen
                </button>
              </div>
            )}
          </div>

          {/* Word Sets from Backend */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
              Wörter Sets
            </div>
            <div className="text-xs text-white/40 mt-1">
              Wähle ein Set aus, um dessen Wörter zu deinen Custom Words
              hinzuzufügen.
            </div>

            <div className="mt-4 space-y-2 pr-1">
              {wordSets.length === 0 ? (
                <div className="text-xs text-white/40">
                  Keine Wörter Sets verfügbar.
                </div>
              ) : (
                visibleWordSets.map((w) => (
                  <div
                    key={w.id}
                    className="
                      rounded-lg border border-white/10 bg-white/5
                      px-3 py-2 flex items-start justify-between gap-3
                    "
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {w.title}
                      </div>
                      <div className="text-xs text-white/50 truncate">
                        {w.desc}
                      </div>
                      <div className="text-xs text-white/50 truncate">
                        Zuletzt aktualisiert:{" "}
                        <ReactTimeAgo
                          date={new Date(w.updatedAt)}
                          locale={language}
                        />
                      </div>
                    </div>

                    {activeSetId === w.id ? (
                      <button
                        type="button"
                        onClick={() => removeWordsFromSet(w.id)}
                        className="
                          shrink-0 rounded-md px-2 py-1 text-xs font-semibold
                          bg-white/10 border border-white/10 hover:bg-white/20
                          hover:border-white/20 transition
                          focus:outline-none focus:ring-2 focus:ring-blue-500/60
                        "
                      >
                        Entfernen
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addWordsFromSet(w.id)}
                        className="
                          shrink-0 rounded-md px-2 py-1 text-xs font-semibold
                          bg-white/10 border border-white/10 hover:bg-white/20
                          hover:border-white/20 transition
                          focus:outline-none focus:ring-2 focus:ring-blue-500/60
                        "
                      >
                        Benutzen
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Mehr / Weniger */}
            {wordSets.length > MAX_VISIBLE_WORDSETS && (
              <button
                type="button"
                onClick={() => setShowAllWordSets((v) => !v)}
                className="
                  mt-3 w-full rounded-lg px-4 py-2 text-xs font-semibold
                  bg-white/10 border border-white/10
                  hover:bg-white/20 hover:border-white/20 transition
                  focus:outline-none focus:ring-2 focus:ring-blue-500/60
                "
              >
                {showAllWordSets
                  ? "Weniger anzeigen"
                  : `Noch ${wordSets.length - MAX_VISIBLE_WORDSETS} anzeigen`}
              </button>
            )}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
              Privat-Code (5-stellig)
            </div>

            <div className="flex items-center gap-2">
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="5-stelliger Code"
                value={privatCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                  setPrivatCode(value);
                  setRedeemError(null);
                }}
                className={`
        w-full rounded-lg px-4 py-3 text-sm text-white
        bg-white/10 placeholder:text-white/40
        outline-none transition
        focus:bg-white/15 focus:ring-2
        ${redeemError ? "ring-2 ring-red-500/50 focus:ring-red-500/60" : "focus:ring-blue-500/60"}
      `}
              />

              <button
                type="button"
                disabled={privatCode.length !== 5 || isRedeeming}
                onClick={redeemPrivatCode}
                className={`
    shrink-0 rounded-lg px-4 py-3 text-sm font-semibold transition
    ${
      privatCode.length !== 5 || isRedeeming
        ? "bg-gray-500/40 text-white/70 cursor-not-allowed"
        : "bg-blue-500/80 hover:bg-blue-500 text-white"
    }
    focus:outline-none focus:ring-2 focus:ring-blue-500/60
  `}
              >
                {isRedeeming ? "..." : "Einlösen"}
              </button>
            </div>

            <div className="mt-2 text-xs">
              {redeemError ? (
                <span className="text-red-300">{redeemError}</span>
              ) : (
                <span className="text-white/40">
                  Gib deinen 5-stelligen Code ein und klicke auf Einlösen.
                </span>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* ✅ UploadSet Popup */}
      <UploadSet
        open={showUploadSet}
        onClose={() => setShowUploadSet(false)}
        words={(customWords as WordEntryWithSource[]).map<UploadWord>((w) => ({
          word: w.word,
          tips: [w.tip].filter(Boolean),
        }))}
      />
    </>
  );
}

export default SettingsMenu;
