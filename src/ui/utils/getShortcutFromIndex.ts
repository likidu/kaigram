export function getShortcutFromIndex(index: number): string | undefined {
  if (index > 8 || index < 0) {
    return;
  }

  return (index + 1).toString();
}
