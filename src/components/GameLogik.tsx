import React, { useState } from "react";
import { PlayerSelection } from "./PlayerSelection";
import { PlayerRevealPage } from "./PlayerRevealPage";
import { getRandomWord } from "./WordsList";

export const GameLogik = () => {
  // Schritt: Auswahl, Reveal, Ende
  const [step, setStep] = useState<"select" | "reveal" | "done">("select");

  // Daten
  const [players, setPlayers] = useState<string[]>([]);
  const [imposter, setImposter] = useState<number | null>(null);
  const [word, setWord] = useState<any>(null);

  // Wer ist gerade dran?
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Wird aufgerufen wenn Spiel gestartet wird
  const startGame = (names: string[], imposterIndex: number) => {
    setPlayers(names);
    setImposter(imposterIndex);
    setWord(getRandomWord());
    setStep("reveal");
  };

  // Nächster Spieler
  const nextPlayer = () => {
    if (currentPlayerIndex + 1 >= players.length) {
      setStep("done");
      return;
    }
    setCurrentPlayerIndex(currentPlayerIndex + 1);
  };

  // Auswahl-Screen
  if (step === "select") {
    return <PlayerSelection onStartGame={startGame} />;
  }

  // Reveal-Screen
  if (step === "reveal") {
    return (
      <PlayerRevealPage
        playerName={players[currentPlayerIndex]}
        isImposter={currentPlayerIndex === imposter}
        word={word.word}
        hint={word.hint}
        onNext={nextPlayer}
      />
    );
  }

  // Spiel fertig
  return (
    <div className="text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Alle Spieler waren dran! 🎉</h1>
      <p className="text-xl">Jetzt kann die Diskussion starten…</p>
    </div>
  );
};
