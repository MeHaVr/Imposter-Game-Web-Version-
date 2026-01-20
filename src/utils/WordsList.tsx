import type { WordsType } from "../types/WordsType";

// Default Liste
const DEFAULT_WORDS: WordsType[] = [
  { word: "apple", tips: ["fruit", "red", "sweet", "tree"] },
  { word: "banana", tips: ["yellow", "fruit", "long", "sweet"] },
  { word: "cherry", tips: ["red", "small", "sweet", "fruit"] },
  { word: "date", tips: ["brown", "sweet", "dry", "fruit"] },
  { word: "elderberry", tips: ["dark", "berry", "juice", "healthy"] },
];

/**
 * Returns a random { word, tips } entry.
 * If customWords are given, they are used instead of DEFAULT_WORDS.
 */
export function RandomWordEntry(customWords?: WordsType[]): WordsType {
  const list =
    customWords && customWords.length > 0 ? customWords : DEFAULT_WORDS;

  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Returns a random tip from the given entry.
 */
export function RandomTip(entry: WordsType): string {
  return entry.tips[Math.floor(Math.random() * entry.tips.length)];
}
