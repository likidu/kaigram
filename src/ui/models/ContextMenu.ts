import type { SvelteComponent } from 'svelte';

export type ContextMenu = {
  title: string;
  body?: string;
  items: {
    icon?: typeof SvelteComponent;
    imageUrl?: string;
    label: string;
    workingLabel?: string;
    onSelect: () => Promise<void> | void;
  }[];
  onMenu?: () => void;
};
