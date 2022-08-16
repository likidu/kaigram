import { get, writable } from 'svelte/store';
import { RenderState } from '../enums';
import type { Toast } from '../models';
import { delay } from '../utils';
import { settings } from './settings';

type Config = {
  state: RenderState;
  animationSpeed: number;
  duration: number;
  toasts: Toast[];
  data?: Toast;
  idle: boolean;
};

const defaultConfig: Config = {
  state: RenderState.Destroyed,
  animationSpeed: 500,
  duration: 3000,
  toasts: [],
  idle: true,
};

function createStore() {
  const store = writable<Config>(defaultConfig);

  function update(config: Partial<Config>) {
    store.set({ ...defaultConfig, ...config });
  }

  async function processNextToast() {
    const config = get(store);
    if (config.toasts.length === 0 || !config.idle) return;

    store.update((a) => ({
      ...a,
      data: a.toasts[0],
      toasts: a.toasts.slice(1),
      idle: false,
    }));

    await open();
    await delay(config.duration);
    await close();

    store.update((a) => ({ ...a, idle: true }));

    processNextToast();
  }

  async function showToast(toast: Toast) {
    store.update((a) => ({
      ...a,
      toasts: [...a.toasts, toast],
    }));

    processNextToast();
  }

  async function open() {
    if (get(store).state !== RenderState.Destroyed) {
      return;
    }

    store.update((val) => ({ ...val, state: RenderState.Closed }));
    await delay(50);
    store.update((val) => ({ ...val, state: RenderState.Open }));
    await delay(get(settings).animationSpeed * 2);
  }

  async function close() {
    if (get(store).state !== RenderState.Open) {
      return;
    }

    store.update((val) => ({ ...val, state: RenderState.Closed }));
    await delay(get(settings).animationSpeed * 2);
    store.update((val) => ({ ...val, state: RenderState.Destroyed }));
  }

  function reset() {
    store.update((a) => ({
      ...a,
      state: RenderState.Destroyed,
      toasts: [],
      data: null,
      idle: true,
    }));
  }

  return {
    subscribe: store.subscribe,
    update,
    showToast,
    reset,
  };
}

export const toaster = createStore();
