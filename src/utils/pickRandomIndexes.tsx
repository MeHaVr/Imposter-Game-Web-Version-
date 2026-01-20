export function pickRandomIndexes(
  maxExclusive: number,
  count: number
): number[] {
  if (count <= 0) return [];
  if (maxExclusive <= 0) return [];
  if (count >= maxExclusive) {
    return Array.from({ length: maxExclusive }, (_, i) => i);
  }

  const indexes = Array.from({ length: maxExclusive }, (_, i) => i);

  // Fisher–Yates shuffle
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes.slice(0, count);
}
