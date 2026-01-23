import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

type UploadSetProps = {
  open: boolean;
  onClose: () => void;
  words: { word: string; tips: string[] }[];
  onSuccess?: () => void;
  helpHref?: string;
};

// -----------------------
// Constants
// -----------------------
const ENDPOINT = "http://localhost:4000/api/new-word-set";
const PREVIEW_LIMIT = 6;
const PREVIEW_SCROLL_MAX_H = "max-h-56";

// -----------------------
// Component
// -----------------------
function UploadSet({
  open,
  onClose,
  words,
  onSuccess,
  helpHref = "https://example.com/how-to-upload-word-sets",
}: UploadSetProps) {
  // Form
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isPrivat, setIsPrivat] = useState(false);
  const [privatSetCode, setPrivatSetCode] = useState("");

  // UX
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [localWords, setLocalWords] = useState<
    { word: string; tips: string[] }[]
  >([]);

  const [showAllPreview, setShowAllPreview] = useState(false);
  const previewListRef = useRef<HTMLDivElement | null>(null);

  // -----------------------
  // Derived
  // -----------------------
  const wordCount = useMemo(() => localWords.length, [localWords]);

  const canSubmit = useMemo(() => {
    if (isPrivat) {
      return (
        title.trim().length >= 3 &&
        desc.trim().length >= 5 &&
        wordCount > 0 &&
        privatSetCode.length === 5
      );
    }

    return title.trim().length >= 3 && desc.trim().length >= 5 && wordCount > 0;
  }, [title, desc, wordCount, isPrivat, privatSetCode]);

  const previewWords = useMemo(
    () => (showAllPreview ? localWords : localWords.slice(0, PREVIEW_LIMIT)),
    [showAllPreview, localWords],
  );

  const hasMorePreview = useMemo(
    () => localWords.length > PREVIEW_LIMIT,
    [localWords.length],
  );

  const codeError =
    isPrivat && privatSetCode.length > 0 && !/^\d{5}$/.test(privatSetCode)
      ? `Code muss genau 5 Ziffern haben.`
      : null;

  // -----------------------
  // UX helpers
  // -----------------------
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Reset when opening + copy words into local state
  useEffect(() => {
    if (!open) return;

    setTitle("");
    setDesc("");
    setErrorMsg(null);
    setSuccessMsg(null);

    setLocalWords(words); // ✅ copy props into local state
    setShowAllPreview(false);
  }, [open, words]);

  // -----------------------
  // Preview actions
  // -----------------------
  const removePreviewWord = (word: string) => {
    setLocalWords((prev) => prev.filter((w) => w.word !== word));
  };

  const togglePreview = () => {
    setShowAllPreview((prev) => {
      const next = !prev;

      // ✅ When expanding: scroll to list top (mobile friendly)
      if (next) {
        requestAnimationFrame(() => {
          previewListRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          previewListRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }

      return next;
    });
  };

  // -----------------------
  // Submit (endpoint inside component ✅)
  // -----------------------
  const uploadSet = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!canSubmit) {
      setErrorMsg(
        "Bitte gib einen Titel (min. 3 Zeichen) und eine Beschreibung (min. 5 Zeichen) an.",
      );
      return;
    }

    setIsSubmitting(true);

    if (isPrivat) {
      await axios.post(
        ENDPOINT + "/privat",
        { words: localWords },
        {
          params: {
            title: title.trim(),
            desc: desc.trim(),
            privatCode: privatSetCode,
          },
        },
      );
    } else {
      await axios.post(
        ENDPOINT,
        { words: localWords },
        {
          params: {
            title: title.trim(),
            desc: desc.trim(),
          },
        },
      );
    }
    try {
      setSuccessMsg("✅ Set wurde hochgeladen! Warte bis es Jemand Acceptiert");
      onSuccess?.();

      setTimeout(() => onClose(), 600);
    } catch (e) {
      setErrorMsg(
        "Upload fehlgeschlagen. Versuche es später noch mal oder schreib Webseite Inhaber an",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  // -----------------------
  // UI
  // -----------------------
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="uploadset-title"
          className="
  w-full max-w-lg
      rounded-2xl border border-white/10
      bg-neutral-950/90 backdrop-blur-md
      shadow-2xl shadow-black/50
      flex flex-col
      max-h-[90vh] overflow-hidden
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 flex items-start justify-between gap-4 border-b border-white/10">
            <div className="min-w-0">
              <div
                id="uploadset-title"
                className="text-sm font-semibold uppercase tracking-widest text-white/70"
              >
                Wörter-Set hochladen
              </div>
              <div className="mt-1 text-sm text-white/50">
                Titel & Beschreibung helfen anderen dein Set zu verstehen.
              </div>
              <a
                href={helpHref}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-2 inline-flex items-center gap-2
                  text-sm font-semibold text-blue-300
                  hover:text-blue-200 transition
                  focus:outline-none focus:ring-2 focus:ring-blue-500/60 rounded-lg px-2 py-1
                "
              >
                Anleitung öffnen <span className="text-white/40">↗</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                h-9 w-9 shrink-0 rounded-xl
                border border-white/10 bg-white/5
                text-white/80
                transition hover:bg-white/10 hover:border-white/20 active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-blue-500/60
              "
              aria-label="Schliessen"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800 flex-1">
            {/* Title */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                Titel
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Schule / Alltag / Essen"
                className="
                  w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white
                  placeholder:text-white/40 outline-none transition
                  focus:bg-white/15 focus:ring-2 focus:ring-blue-500/60
                "
              />
              <div className="mt-2 text-[11px] text-white/40">
                min. 3 Zeichen
              </div>
            </div>

            {/* Desc */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                Beschreibung
              </div>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="z.B. Wörter für eine schnelle Runde im Unterricht."
                rows={3}
                className="
                  w-full resize-none rounded-lg bg-white/10 px-4 py-3 text-sm text-white
                  placeholder:text-white/40 outline-none transition
                  focus:bg-white/15 focus:ring-2 focus:ring-blue-500/60
                "
              />
              <div className="mt-2 text-[11px] text-white/40">
                min. 5 Zeichen
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    Vorschau
                  </div>

                  <div className="text-xs text-white/40 mt-1">
                    Du lädst{" "}
                    <span className="text-white/70 font-semibold">
                      {wordCount}
                    </span>{" "}
                    {wordCount === 1 ? "Wort" : "Wörter"} hoch.
                    {hasMorePreview && !showAllPreview && (
                      <>
                        {" "}
                        Unten siehst du zuerst{" "}
                        <span className="text-white/70 font-semibold">
                          {PREVIEW_LIMIT}
                        </span>
                        .
                      </>
                    )}
                  </div>

                  {hasMorePreview && !showAllPreview && (
                    <div className="text-[11px] text-white/35 mt-1">
                      (+{wordCount - PREVIEW_LIMIT} weitere werden auch
                      hochgeladen)
                    </div>
                  )}
                </div>

                <div className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                  {wordCount} total
                </div>
              </div>

              {/* ✅ List (scrollable when expanded) */}
              <div
                ref={previewListRef}
                className={`
                  mt-3 space-y-2 pr-1
                  ${showAllPreview ? `${PREVIEW_SCROLL_MAX_H} overflow-y-auto overscroll-contain` : ""}
                `}
              >
                {previewWords.map((w) => (
                  <div
                    key={w.word}
                    className="
                      rounded-lg border border-white/10 bg-white/5
                      px-3 py-2 flex items-start justify-between gap-3
                    "
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {w.word}
                      </div>

                      <div className="text-xs text-white/50 truncate">
                        Tipp:{" "}
                        {(w.tips?.length ?? 0) === 0
                          ? "—"
                          : w.tips.length === 1
                            ? w.tips[0]
                            : `${w.tips[0]} (+${w.tips.length - 1} mehr)`}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removePreviewWord(w.word)}
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
                ))}

                {previewWords.length === 0 && (
                  <div className="text-xs text-white/40">
                    Keine Wörter mehr übrig.
                  </div>
                )}
              </div>

              {/* ✅ More / Less button */}
              {hasMorePreview && (
                <button
                  type="button"
                  onClick={togglePreview}
                  className="
                    mt-3 w-full rounded-lg px-4 py-2 text-xs font-semibold
                    bg-white/10 border border-white/10
                    hover:bg-white/20 hover:border-white/20 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-500/60
                  "
                >
                  {showAllPreview
                    ? "Weniger anzeigen"
                    : `Noch ${wordCount - PREVIEW_LIMIT} anzeigen`}
                </button>
              )}
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                {successMsg}
              </div>
            )}
            {isPrivat && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                  Privat Code fürs Set
                </div>
                <input
                  value={privatSetCode}
                  onChange={(e) => {
                    // nur Zahlen erlauben + max 5

                    const digitsOnly = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 5);
                    setPrivatSetCode(digitsOnly);
                  }}
                  placeholder="5-stelliger Code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  aria-invalid={Boolean(codeError)}
                  aria-describedby="private-code-help"
                  className={`
    w-full rounded-lg px-4 py-3 text-sm text-white outline-none transition
    bg-white/10 placeholder:text-white/40
    focus:bg-white/15 focus:ring-2
    ${codeError ? "ring-2 ring-red-500/60 focus:ring-red-500/60" : "focus:ring-blue-500/60"}
  `}
                />

                <div className="mt-2 text-[11px] text-white/40">
                  Um dieses Set später zu verwenden, gib deinen Code in den
                  Einstellungen unter „Privat-Code“ ein. Bitte notiere oder
                  merke dir den Code.
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Privat Checkbox */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none mb-2 sm:mb-0">
              {/* Hidden native checkbox */}
              <input
                type="checkbox"
                checked={isPrivat}
                onChange={() => setIsPrivat(!isPrivat)}
                className="peer sr-only"
              />

              {/* Checkbox */}
              <div
                className="
        h-5 w-5 rounded-md
        border border-white/20 bg-white/10
        flex items-center justify-center
        transition-all duration-150
        peer-checked:bg-blue-500/80 peer-checked:border-blue-500/60
        peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/60
      "
              ></div>

              {/* Label */}
              <span className="text-sm font-semibold text-white/80">
                Privat
              </span>
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="
        w-full sm:w-auto rounded-lg px-4 py-3 text-sm font-semibold
        bg-white/10 border border-white/10
        hover:bg-white/20 hover:border-white/20 transition
        focus:outline-none focus:ring-2 focus:ring-blue-500/60
      "
              >
                Abbrechen
              </button>

              <button
                type="button"
                disabled={!canSubmit || isSubmitting}
                onClick={uploadSet}
                className={`
        w-full sm:w-auto rounded-lg px-4 py-3 text-sm font-semibold transition
        ${
          !canSubmit || isSubmitting
            ? "bg-gray-500/40 text-white/70 cursor-not-allowed"
            : "bg-blue-500/80 hover:bg-blue-500 text-white"
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500/60
      `}
              >
                {isSubmitting ? "Lädt hoch..." : "Set hochladen"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadSet;
