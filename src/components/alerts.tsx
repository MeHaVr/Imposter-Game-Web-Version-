import { useEffect, useState } from "react";

type AlertProps = {
  message: string;
  active: boolean;
  type: "success" | "error" | "info" | "warning" | null;
  onClose?: () => void;
};

function Alerts({ message, active, type, onClose }: AlertProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [active, onClose]);

  if (!isVisible) return null;

  const getAlertClasses = () => {
    let containerClasses =
      "fixed top-10 inset-x-0 mx-auto z-50 rounded-xl border p-4 backdrop-blur-md shadow-lg max-w-md w-[calc(100%-1.5rem)] animate-in fade-in slide-in-from-top-2 duration-300";

    let svgClasses = "w-6 h-6 shrink-0";

    switch (type) {
      case "success":
        containerClasses += " border-green-500/20 bg-green-500/10";
        svgClasses += " text-green-500";
        break;
      case "error":
        containerClasses += " border-red-500/20 bg-red-500/10";
        svgClasses += " text-red-500";
        break;
      case "warning":
        containerClasses += " border-amber-500/20 bg-amber-500/10";
        svgClasses += " text-amber-500";
        break;
      case "info":
        containerClasses += " border-blue-500/20 bg-blue-500/10";
        svgClasses += " text-blue-500";
        break;
      default:
        containerClasses += " border-gray-500/20 bg-gray-500/10";
        svgClasses += " text-gray-500";
        break;
    }
    return { containerClasses, svgClasses };
  };

  const { containerClasses, svgClasses } = getAlertClasses();

  return (
    <div className={containerClasses}>
      <div className="flex items-start gap-3">
        <svg
          className={svgClasses}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        <p className="text-sm text-white/90 flex-1">{message}</p>

        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="shrink-0 text-white/60 hover:text-white/90 touch-manipulation 
  active:scale-95 
  transition-transform 
  select-none"
          aria-label="Schließen"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Alerts;
