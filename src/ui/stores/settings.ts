import { writable } from 'svelte/store';
import { Animations, Density, TextSize, TextWeight } from '../enums';
import type { BaseSettings } from '../models';
import { themes } from '../themes';

type Config = BaseSettings;

const defaultConfig: Config = {
  themeId: themes[0].id,
  textSize: TextSize.Medium,
  textWeight: TextWeight.Medium,
  displayDensity: Density.Normal,
  borderRadius: 14,
  animationSpeed: Animations.Normal,
  showHelpText: true,
  useAppMenu: true,
  appMenuWidth: 85,
  // Shortcuts
  enableShortcutKeys: true,
  shortcutKeyLocation: 'right',
  shortcutKeyColor: 'secondary',
  contextMenuIndicators: true,
  // Theme
  accentColorH: themes[0].values.accentColorH,
  accentColorS: themes[0].values.accentColorS,
  accentColorL: themes[0].values.accentColorL,
  cardColorH: themes[0].values.cardColorH,
  cardColorS: themes[0].values.cardColorS,
  cardColorL: themes[0].values.cardColorL,
  textColorH: themes[0].values.textColorH,
  textColorS: themes[0].values.textColorS,
  textColorL: themes[0].values.textColorL,
  focusColorA: themes[0].values.focusColorA,
  dividerColorA: themes[0].values.dividerColorA,
  // Toaster
  toasterLocation: 'bottom',
  toasterDuration: 3000,
};

function createStore() {
  const store = writable<Config>(defaultConfig);

  function update(data: Partial<Config>) {
    store.update((a) => ({ ...a, ...data }));
  }

  return {
    subscribe: store.subscribe,
    set: store.set,
    update,
  };
}

export const settings = createStore();
