type WordShowCardProps = {
  isVisible: boolean;
  word: string;
  onToggle: () => void; // wir benutzen es als "reveal"
  onBack: () => void;
  isEndScreen?: boolean;
  isTipword: boolean;
  tipWord: string;
};

function WordShowCard({
  isVisible,
  word,
  onToggle,
  onBack,
  isEndScreen = false,
  isTipword,
  tipWord,
}: WordShowCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => {
          if (!isVisible) onToggle();
        }}
        className="
          group relative w-72 h-44
          rounded-2xl border border-white/10
          bg-white/5 backdrop-blur-md
          shadow-lg shadow-black/20
          transition duration-200
          hover:border-white/20 hover:bg-white/10
          active:scale-[0.99]
          focus:outline-none focus:ring-2 focus:ring-blue-500/60
          flex items-center justify-center
        "
        aria-label={isVisible ? "Word shown" : "Show word"}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />

        <div className="relative px-6 text-center w-full">
          {/* Visible */}
          <div
            className={`
              transition-all duration-200
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
              {isEndScreen ? "Das Wort war" : "Dein Wort"}
            </div>
            <div className="text-3xl font-semibold tracking-wide text-white">
              {word == "IMPOSTER" ? "Du bist der Imposter" : word}
            </div>
            <div className="mt-3 text-xs text-white/40">
              {isEndScreen
                ? isTipword
                  ? "Der Tip-Wort war: " + tipWord
                  : "Tip-Wort ist deaktiviert"
                : "Drücke „Nächster Spieler“"}
            </div>
          </div>

          {/* Hidden */}
          <div
            className={`
              absolute inset-0 flex flex-col items-center justify-center
              transition-all duration-200
              ${isVisible ? "opacity-0 scale-95" : "opacity-100 scale-100"}
            `}
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
              Versteckt
            </div>
            <div className="text-lg font-semibold text-white/70">
              Tippe zum Anzeigen
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default WordShowCard;
