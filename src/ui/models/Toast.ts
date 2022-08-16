import type { SvelteComponent } from 'svelte';

export type Toast = {
  icon?: typeof SvelteComponent;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
};
