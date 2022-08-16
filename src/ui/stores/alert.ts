import { get, writable } from 'svelte/store';
import { RenderState } from '../enums';
import type { Alert } from '../models';
import { delay } from '../utils';
import { settings } from './settings';

type Config = {
  state: RenderState;
  data: Alert;
};

const defaultAlert: Alert = {
  title: 'Alert Title',
};

const defaultConfig: Config = {
  state: RenderState.Destroyed,
  data: defaultAlert,
};

function createStore() {
  const store = writable<Config>(defaultConfig);

  async function open(data: Alert) {
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
    store.update((val) => ({ ...val, state: RenderState.Destroyed, data: defaultAlert }));
  }

  function reset() {
    store.update((val) => ({ ...val, state: RenderState.Destroyed, data: defaultAlert }));
  }

  return {
    subscribe: store.subscribe,
    open,
    close,
    reset,
  };
}

export const alert = createStore();
