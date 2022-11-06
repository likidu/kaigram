export type Navigation = {
  itemId: string;
  shortcutKey?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onSelect?: () => void;
  onSoftLeft?: () => void;
  onSoftRight?: () => void;
};
