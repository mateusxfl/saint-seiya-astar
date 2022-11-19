export default function* getCombinations<T>(
  array: T[],
  length: number,
): IterableIterator<T[]> {
  for (let i = 0; i < array.length; i += 1) {
    if (length === 1) {
      yield [array[i]];
    } else {
      const remaining = getCombinations(
        array.slice(i + 1, array.length),
        length - 1,
      );
      for (const next of remaining) {
        yield [array[i], ...next];
      }
    }
  }
}
