export type Dialog = {
  title: string;
  body?: string;
  actions: {
    left?: { label: string; fn: () => void };
    center?: { label: string; fn: () => void };
    right?: { label: string; fn: () => void };
  };
};
