type Config = {
  focused: boolean;
};

export function focus(node: HTMLElement, config: Config) {
  if (config.focused) {
    node.focus({ preventScroll: true });
  } else {
    node.blur();
  }

  return {
    update(newConfig: Config) {
      if (newConfig.focused) {
        node.focus({ preventScroll: true });
      } else {
        node.blur();
      }
    },
  };
}
