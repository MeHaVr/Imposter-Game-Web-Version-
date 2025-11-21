import React, { useState } from "react";
import { PlayerSelection } from "./PlayerSelection";
import { PlayerRevealPage } from "./PlayerRevealPage";
import { getRandomWord } from "./WordsList";

export const GameLogik = () => {
  const [step, setStep] = useState<"select" | "reveal" | "done">("select");

  const [players, setPlayers] = useState<string[]>([]);
  const [imposter, setImposter] = useState<number | null>(null);
  const [word, setWord] = useState<any>(null);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const startGame = (names: string[], imposterIndex: number) => {
    setPlayers(names);
    setImposter(imposterIndex);
    setWord(getRandomWord());
    setCurrentPlayerIndex(0);
    setStep("reveal");
  };

  const nextPlayer = () => {
    if (currentPlayerIndex + 1 >= players.length) {
      setStep("done");
      return;
    }
    setCurrentPlayerIndex(currentPlayerIndex + 1);
  };

  const restartGame = () => {
    setPlayers([]);
    setImposter(null);
    setWord(null);
    setCurrentPlayerIndex(0);
    setStep("select");
  };

  if (step === "select") {
    return <PlayerSelection onStartGame={startGame} />;
  }

  if (step === "reveal") {
    return (
      <PlayerRevealPage
        playerName={players[currentPlayerIndex]}
        isImposter={currentPlayerIndex === imposter}
        word={word.word}
        hint={word.hint}
        onNext={nextPlayer}
        playerIndex={currentPlayerIndex}
      />
    );
  }

  return (
    <div className="text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Alle Spieler waren dran 🎉</h1>

      <p className="text-xl mb-6">
        Der Imposter war:{" "}
        <span className="text-pink-400 font-bold">
          {imposter !== null ? players[imposter] : "?"}
        </span>
      </p>

      <button
        onClick={restartGame}
        className="mt-6 px-6 py-3 bg-pink-600 rounded-xl text-lg shadow-lg hover:bg-pink-700 transition"
      >
        🔁 Neues Spiel starten
      </button>
    </div>
  );
};
