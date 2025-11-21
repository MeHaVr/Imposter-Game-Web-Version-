import React, { useState } from "react";

export const ClassicCard = ({
  hiddenText,
  revealText,
  suit = "♠",
  onFlip, // <--- NEU
}: any) => {
  const [open, setOpen] = useState(false);

  const isRed = suit === "♥" || suit === "♦";
  const fontColor = isRed ? "#c4001d" : "#1a1a1a";

  const flipCard = () => {
    const newState = !open;
    setOpen(newState);

    if (newState && onFlip) onFlip(); // <--- Callback wenn Flip passiert
  };

  return (
    <div className={`card-container ${open ? "open" : ""}`} onClick={flipCard}>
      <div className="card-sheet card-front"></div>

      <div className="card-sheet card-back" style={{ color: fontColor }}>
        <div style={{ fontSize: "2.6rem", marginBottom: "10px" }}>{suit}</div>
        <div>{revealText}</div>
        <div style={{ fontSize: "2.6rem", marginTop: "10px" }}>{suit}</div>
      </div>
    </div>
  );
};
