type BackButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
};

export default function BackButton({
  onClick,
  label = "Zurück",
  className = "",
}: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        fixed top-5 left-5 z-10
        h-11 px-4 rounded-xl
        border border-white/10 bg-white/5 backdrop-blur-md
        shadow-lg shadow-black/20
        flex items-center gap-2
        transition hover:bg-white/10 hover:border-white/20
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-blue-500/60
        ${className}
      `}
      aria-label={label}
    >
      <span className="text-white/80 text-lg leading-none">←</span>
      <span className="hidden sm:inline text-sm font-semibold text-white/80">
        {label}
      </span>
    </button>
  );
}
