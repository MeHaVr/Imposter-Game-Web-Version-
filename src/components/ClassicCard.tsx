import React, { useState } from "react";

export const ClassicCard = ({
  hiddenText,
  revealText,
}: {
  hiddenText: string;
  revealText: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`card-container ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      {/* Rückseite */}
      <div className="card-sheet card-front">{hiddenText}</div>

      {/* Vorderseite */}
      <div className="card-sheet card-back">{revealText}</div>
    </div>
  );
};
