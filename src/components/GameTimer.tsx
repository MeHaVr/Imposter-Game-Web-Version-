import { useEffect, useState } from "react";

type GameTimerProps = {
  seconds: number;
  onEnd?: () => void;
  autoStart?: boolean;
};

function GameTimer({ seconds, onEnd, autoStart = true }: GameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      onEnd?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isRunning, onEnd]);

  useEffect(() => {
    setTimeLeft(seconds);
    setIsRunning(autoStart);
  }, [seconds, autoStart]);

  const progress = (timeLeft / seconds) * 100;

  return (
    <div
      className="
        w-72 rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-md
        shadow-lg shadow-black/20
        p-4
      "
    >
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50 text-center">
        Zeit
      </div>

      <div className="text-center text-3xl font-bold text-white mb-3">
        {timeLeft}s
      </div>

      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default GameTimer;
