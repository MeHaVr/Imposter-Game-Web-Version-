// words.tsx
// Kleine Wortliste + Hinweise für den Imposter

export interface WordEntry {
  word: string; // Das echte Wort für die normalen Spieler
  hint: string; // Tipp für den Imposter
}

export const wordList: WordEntry[] = [
  {
    word: "Banane",
    hint: "Gelb und krumm",
  },
  {
    word: "Auto",
    hint: "Vier Räder",
  },
  {
    word: "Katze",
    hint: "Ein Haustier",
  },
  {
    word: "Pizza",
    hint: "Rund und lecker",
  },
  {
    word: "Schule",
    hint: "Ort zum Lernen",
  },
  {
    word: "Eiffelturm",
    hint: "In Paris",
  },
  {
    word: "Flugzeug",
    hint: "Fliegt sehr hoch",
  },
  {
    word: "Sonne",
    hint: "Sehr warm",
  },
  {
    word: "Laptop",
    hint: "Benutzt du zum Programmieren",
  },
  {
    word: "Hund",
    hint: "Bester Freund des Menschen",
  },
];

export function getRandomWord(): WordEntry {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
