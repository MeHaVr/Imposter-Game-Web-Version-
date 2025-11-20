import React from "react";
import { ClassicCard } from "./ClassicCard";

export const PlayerRevealPage = ({
  playerName,
  isImposter,
  word,
  hint,
  onNext,
}: any) => {
  return (
    <div className="text-white p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">{playerName}</h1>

      <ClassicCard
        hiddenText="👀 Karte umblättern"
        revealText={isImposter ? `Tipp: ${hint}` : `Wort: ${word}`}
      />

      <button
        onClick={onNext}
        className="mt-8 px-6 py-3 bg-pink-600 rounded-xl text-lg shadow-lg"
      >
        Weiter zum nächsten Spieler →
      </button>
    </div>
  );
};
