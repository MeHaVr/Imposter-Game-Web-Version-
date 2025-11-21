import React, { useState } from "react";
import { ClassicCard } from "./ClassicCard";

const suits = ["♠", "♥", "♦", "♣"];

export const PlayerRevealPage = ({
  playerName,
  isImposter,
  word,
  hint,
  onNext,
  playerIndex,
}: any) => {
  const [flipped, setFlipped] = useState(false);
  const suit = suits[playerIndex % 4];

  return (
    <div className="text-white text-center p-6">
      <h1 className="text-3xl font-bold mb-6">{playerName}</h1>

      <ClassicCard
        key={playerIndex}
        suit={suit}
        hiddenText="👀 Karte umblättern"
        revealText={isImposter ? `Tipp: ${hint}` : `Wort: ${word}`}
        onFlip={() => setFlipped(true)} // <--- Aktiviert Weiter Button
      />

      <button
        onClick={onNext}
        disabled={!flipped} // <--- Button gesperrt bis Karte offen ist
        className={`mt-8 px-6 py-3 rounded-xl text-lg shadow-lg transition ${
          flipped
            ? "bg-pink-600 hover:bg-pink-700"
            : "bg-gray-600/40 opacity-40 cursor-not-allowed"
        }`}
      >
        Weiter →
      </button>
    </div>
  );
};
