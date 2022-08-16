import { get, writable } from 'svelte/store';
import { DataStatus, ViewState } from '../enums';
import type { Card } from '../models';
import { getIndex } from '../utils';

// View

type ViewConfig = {
  viewing: ViewState;
  dataStatus: DataStatus;
  cards: Card[];
  activeCardId: string | null;
  wrapCards: boolean;
};

const defaultViewConfig: ViewConfig = {
  viewing: ViewState.Card,
  dataStatus: DataStatus.Init,
  cards: [],
  activeCardId: null,
  wrapCards: false,
};

export const view = writable<ViewConfig>(defaultViewConfig);

export function registerView(data: Partial<ViewConfig>) {
  view.set({ ...defaultViewConfig, ...data });
}

export function updateView(data: Partial<ViewConfig>) {
  view.update((val) => ({ ...val, ...data }));

  if (data.activeCardId) {
    get(view)
      .cards.find((a) => a.id === data.activeCardId)
      ?.onSelect?.();
  }
}

export function resetView() {
  view.set(defaultViewConfig);
}

// Cards

export function switchCard(value: 1 | -1) {
  const v = get(view);

  if (v.cards.length < 2) {
    return;
  }

  const current = v.cards.findIndex((a) => a.id === get(view).activeCardId);
  const next = getIndex(v.cards, current, value, v.wrapCards);

  const newCards = v.cards.map((a) => ({ ...a, active: false }));
  newCards[next >= 0 ? next : 0].active = true;

  updateView({ activeCardId: v.cards[next].id });
}
