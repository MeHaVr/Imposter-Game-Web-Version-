import React, { useState } from "react";
import Select from "react-select";

export const PlayerSelection = ({ onStartGame }: any) => {
  const [selectedOptionPlayer, setSelectedOptionPlayer] = useState<any>(null);
  const [selectedOptionImposter, setSelectedOptionImposter] =
    useState<any>(null);

  const [playerInputs, setPlayerInputs] = useState<
    { id: number; text: string }[]
  >([]);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const [namesConfirmed, setNamesConfirmed] = useState(false);
  const [imposter, setImposter] = useState<number | null>(null);

  const playerNumber = [
    { value: 3, label: "3 Personen" },
    { value: 4, label: "4 Personen" },
    { value: 5, label: "5 Personen" },
    { value: 6, label: "6 Personen" },
    { value: 7, label: "7 Personen" },
  ];

  const imposterNumber = [{ value: 1, label: "1 Imposter" }];

  // Spieleranzahl auswählen
  const handlePlayerChange = (option: any) => {
    setSelectedOptionPlayer(option);
    setNamesConfirmed(false);
    setSelectedOptionImposter(null);
    setImposter(null);

    const inputs = Array.from({ length: option.value }, (_, i) => ({
      id: i,
      text: "",
    }));

    setPlayerInputs(inputs);
    setPlayerNames([]);
  };

  // Name verändern
  const handleInputChange = (index: number, value: string) => {
    const updated = [...playerInputs];
    updated[index].text = value;

    setPlayerInputs(updated);
    setPlayerNames(updated.map((p) => p.text.trim()));
  };

  const allNamesFilled =
    playerInputs.length > 0 &&
    playerInputs.every((p) => p.text.trim().length > 0);

  // Namen bestätigen
  const handleConfirmNames = () => {
    if (!allNamesFilled) return;
    setNamesConfirmed(true);
  };

  // Imposter auswählen (Random)
  const handleImposterSelect = (option: any) => {
    setSelectedOptionImposter(option);
    const randomIndex = Math.floor(Math.random() * playerNames.length);
    setImposter(randomIndex);
  };

  // Spiel starten
  const handlePlay = () => {
    if (!allNamesFilled || imposter === null) return;
    onStartGame(playerNames, imposter);
  };

  // react-select Styling
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "#111827",
      borderColor: "#FF2D95",
      boxShadow: "0 0 10px rgba(255,45,149,0.4)",
      color: "white",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#0A0A0F",
      color: "white",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#FF2D95"
        : state.isFocused
        ? "#A259FF40"
        : "#111827",
      color: "white",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "white",
    }),
  };

  return (
    <div className="text-white mt-6 px-4">
      {/* Spieleranzahl */}
      <span className="block mb-2 text-slate-300 text-lg">
        Wie viele Personen?
      </span>

      <Select
        options={playerNumber}
        value={selectedOptionPlayer}
        onChange={handlePlayerChange}
        styles={selectStyles}
      />

      {/* Eingabefelder */}
      {playerInputs.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl mb-3 text-slate-200">Spieler Namen:</h2>

          {playerInputs.map((input, index) => (
            <input
              key={input.id}
              type="text"
              placeholder={`Spieler ${index + 1}`}
              className="
                w-full mb-3 px-3 py-2 rounded-xl bg-[#111827]/70 text-white
                border border-pink-400 shadow-[0_0_12px_rgba(255,45,149,0.5)]
                placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500
              "
              value={input.text}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}

          {!namesConfirmed && (
            <button
              className={`w-full mt-3 py-2 rounded-xl text-lg font-semibold ${
                allNamesFilled
                  ? "bg-pink-600 shadow-[0_0_12px_rgba(255,45,149,0.8)]"
                  : "bg-pink-900/40 opacity-50"
              }`}
              disabled={!allNamesFilled}
              onClick={handleConfirmNames}
            >
              Weiter
            </button>
          )}
        </div>
      )}

      {/* Imposter Auswahl */}
      {namesConfirmed && (
        <>
          <span className="block mt-6 mb-2 text-slate-300 text-lg">
            Wie viele Imposter?
          </span>

          <Select
            options={imposterNumber}
            value={selectedOptionImposter}
            onChange={handleImposterSelect}
            styles={selectStyles}
          />

          <button
            className="w-full mt-3 py-2 rounded-xl text-lg font-semibold bg-pink-600 shadow-[0_0_12px_rgba(255,45,149,0.8)]"
            onClick={handlePlay}
            disabled={!allNamesFilled || imposter === null}
          >
            Spielen?
          </button>
        </>
      )}
    </div>
  );
};
