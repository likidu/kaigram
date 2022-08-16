import { get, writable } from 'svelte/store';
import { RenderState } from '../enums';
import type { Dialog } from '../models';
import { delay } from '../utils';
import { settings } from './settings';

type Config = {
  state: RenderState;
  animationSpeed: number;
  data: Dialog;
};

const defaultData: Dialog = {
  title: 'Title',
  actions: {
    center: { label: 'OK', fn: () => null },
  },
};

const defaultConfig: Config = {
  state: RenderState.Destroyed,
  animationSpeed: 500,
  data: defaultData,
};

function createStore() {
  const store = writable<Config>(defaultConfig);

  function update(config: Partial<Config>) {
    store.set({ ...defaultConfig, ...config });
  }

  async function open(data: Dialog) {
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

  return {
    subscribe: store.subscribe,
    update,
    open,
    close,
    reset,
  };
}

export const dialog = createStore();
