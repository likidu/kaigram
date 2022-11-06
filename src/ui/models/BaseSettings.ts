import type { Animations, Density, TextSize, TextWeight } from '../enums';
import type { ThemeSettings } from './ThemeSettings';

export type BaseSettings = ThemeSettings & {
  textSize: TextSize;
  textWeight: TextWeight;
  displayDensity: Density;
  borderRadius: number;
  animationSpeed: Animations;
  themeId: string;
  useAppMenu: boolean;
  appMenuWidth: number;
  // Shortcuts
  enableShortcutKeys: boolean;
  shortcutKeyLocation: 'left' | 'right' | 'hidden';
  shortcutKeyColor: 'primary' | 'secondary' | 'accent';
  // Context Menus
  contextMenuIndicators: boolean;
  // Toaster
  toasterLocation: 'top' | 'bottom';
  toasterDuration: number;

  showHelpText: boolean;
};
