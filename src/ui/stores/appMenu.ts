import { get, writable } from 'svelte/store';
import { RenderState } from '../enums';
import { delay } from '../utils';
import { settings } from './settings';

type Config = {
  state: RenderState;
};

const defaultConfig: Config = {
  state: RenderState.Destroyed,
};

function createStore() {
  const store = writable<Config>(defaultConfig);

  async function open() {
    if (get(store).state !== RenderState.Destroyed) {
      return;
    }

    store.update((val) => ({ ...val, state: RenderState.Closed }));
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
    store.update((val) => ({ ...val, state: RenderState.Destroyed }));
  }

  async function reset() {
    store.update((val) => ({ ...val, state: RenderState.Destroyed }));
  }

  return {
    subscribe: store.subscribe,
    open,
    close,
    reset,
  };
}

export const appMenu = createStore();
