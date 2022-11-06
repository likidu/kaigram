import { get, writable } from 'svelte/store';
import { RenderState } from '../enums';
import type { ContextMenu } from '../models';
import { delay } from '../utils';
import { settings } from './settings';

type Config = {
  state: RenderState;
  data: ContextMenu;
};

const defaultData: ContextMenu = {
  title: 'Menu',
  items: [],
};
const defaultConfig: Config = {
  state: RenderState.Destroyed,
  data: defaultData,
};

function createStore() {
  const store = writable<Config>(defaultConfig);

  async function open(data: ContextMenu) {
    if (get(store).state !== RenderState.Destroyed) {
      return;
    }

    store.update((val) => ({ ...val, state: RenderState.Closed, data }));
    await delay(50);
    store.update((val) => ({ ...val, state: RenderState.Open }));
    await delay(get(settings).animationSpeed);
  }

  async function close() {
    if (get(store).state !== RenderState.Open) {
      return;
    }

    store.update((val) => ({ ...val, state: RenderState.Closed }));
    await delay(get(settings).animationSpeed);
    store.update((val) => ({ ...val, state: RenderState.Destroyed, data: defaultData }));
  }

  async function reset() {
    store.update((val) => ({ ...val, state: RenderState.Destroyed, data: defaultData }));
  }

  function isOpen(): boolean {
    return get(store).state !== RenderState.Destroyed;
  }

  return {
    subscribe: store.subscribe,
    open,
    close,
    reset,
    isOpen,
  };
}

export const contextMenu = createStore();
