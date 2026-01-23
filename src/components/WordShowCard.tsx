type WordShowCardProps = {
  isVisible: boolean;
  word: string;
  onToggle: () => void;
  onBack: () => void;

  isTipword?: boolean;
  tipWord?: string;
  isEndScreen?: boolean;
};

function WordShowCard({
  isVisible,
  word,
  onToggle,
  isTipword = false,
  tipWord = "",
  isEndScreen = false,
}: WordShowCardProps) {
  const showWord = isEndScreen || isVisible;

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => {
          if (!showWord && !isEndScreen) onToggle();
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
        aria-label={showWord ? "Word shown" : "Show word"}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />

        <div className="relative px-6 text-center w-full">
          {showWord ? (
            <div className="transition-all duration-150 opacity-100 scale-100">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                Dein Wort
              </div>

              <div className="text-3xl font-semibold tracking-wide text-white">
                {word}
              </div>

              {isTipword && tipWord && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
                  <span className="font-semibold tracking-wide">TIPP</span>
                  <span className="text-white/70">{tipWord}</span>
                </div>
              )}

              {!isEndScreen && (
                <div className="mt-3 text-xs text-white/40">
                  Drücke „Nächster Spieler“
                </div>
              )}
            </div>
          ) : (
            <div className="transition-all duration-150 opacity-100">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                Versteckt
              </div>
              <div className="text-lg font-semibold text-white/70">
                Tippe zum Anzeigen
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

export default WordShowCard;
