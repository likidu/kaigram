export function getIndex(arr: unknown[], index: number, change: 1 | -1, wrap = false): number {
  let newIndex = index + change;

  if (newIndex < 0 && !wrap) {
    newIndex = 0;
  } else if (newIndex < 0 && wrap) {
    newIndex = arr.length - 1;
  } else if (newIndex === arr.length && !wrap) {
    newIndex = arr.length - 1;
  } else if (newIndex === arr.length && wrap) {
    newIndex = 0;
  }

  return newIndex;
}
