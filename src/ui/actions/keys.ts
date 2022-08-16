type Config = {
  disabled?: boolean;
  longPressAction?: 'action' | 'repeat';
  priority?: 'high' | 'default';
  onArrowUp?: () => boolean;
  onArrowUpLong?: () => boolean;
  onArrowDown?: () => boolean;
  onArrowDownLong?: () => boolean;
  onArrowLeft?: () => boolean;
  onArrowLeftLong?: () => boolean;
  onArrowRight?: () => boolean;
  onArrowRightLong?: () => boolean;
  onEnter?: () => boolean;
  onEnterLong?: () => boolean;
  onSoftLeft?: () => boolean;
  onSoftLeftLong?: () => boolean;
  onSoftRight?: () => boolean;
  onSoftRightLong?: () => boolean;
  onBackspace?: () => boolean;
  onBackspaceLong?: () => boolean;
};

class KeyPress {
  private downEv: KeyboardEvent;
  private upEv: KeyboardEvent;
  private key: string;
  private isLongPress: boolean;
  private handlers: Config;
  private processed = false;

  constructor(handlers: Config) {
    this.handlers = handlers;
  }

  down(ev: KeyboardEvent) {
    const key = this.getKey(ev);
    if (!key) return;
    this.downEv = ev;
    this.key = key;
  }

  up(ev: KeyboardEvent) {
    const key = this.getKey(ev);
    if (!key || key !== this.key) return;

    this.upEv = ev;
  }

  process(longPress = false) {
    if (this.processed) return;

    console.log('handleKeyPress', this, longPress);

    const handler = this.handlers[`on${this.key}${longPress ? 'Long' : ''}`];
    const handled = handler?.();

    if (!handled) return;

    this.processed = true;

    this.downEv?.stopPropagation();
    this.downEv?.stopImmediatePropagation();
    this.downEv?.preventDefault();
    this.upEv?.stopPropagation();
    this.upEv?.stopImmediatePropagation();
    this.upEv?.preventDefault();
  }

  private getKey(ev: KeyboardEvent): string | null {
    let key: string | null = ev.key;

    if (ev.shiftKey && ev.key === 'ArrowLeft') {
      key = 'SoftLeft';
    }
    if (ev.shiftKey && ev.key === 'ArrowRight') {
      key = 'SoftRight';
    }

    const dpadKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Backspace',
      'SoftLeft',
      'SoftRight',
    ];

    const target = ev.target as HTMLElement | null;
    if (
      this.handlers.disabled ||
      !dpadKeys.includes(key) ||
      (!['SoftLeft', 'SoftRight', 'Enter'].includes(key) &&
        target?.tagName.toLowerCase() === 'input') ||
      (!['SoftLeft', 'SoftRight', 'Enter'].includes(key) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (target?.attributes as any).role?.value === 'textbox') ||
      ev.repeat
    ) {
      key = null;
    }

    return key;
  }
}

export function keys(node: HTMLElement, config: Config) {
  async function handleKeyPress(ev: KeyboardEvent, key: string, longPress = false) {
    console.log('handleKeyPress', ev, key, longPress);

    const handler = config[`on${key}${longPress ? 'Long' : ''}`];
    const handled = handler?.();

    if (!handled) return;

    ev.stopPropagation();
    ev.stopImmediatePropagation();
    ev.preventDefault();
  }

  function getKey(ev: KeyboardEvent): string | null {
    let key: string | null = ev.key;

    if (ev.shiftKey && ev.key === 'ArrowLeft') {
      key = 'SoftLeft';
    }
    if (ev.shiftKey && ev.key === 'ArrowRight') {
      key = 'SoftRight';
    }

    const dpadKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Backspace',
      'SoftLeft',
      'SoftRight',
    ];

    const target = ev.target as HTMLElement | null;
    if (
      config.disabled ||
      !dpadKeys.includes(key) ||
      (!['SoftLeft', 'SoftRight', 'Enter'].includes(key) &&
        target?.tagName.toLowerCase() === 'input') ||
      (!['SoftLeft', 'SoftRight', 'Enter'].includes(key) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (target?.attributes as any).role?.value === 'textbox') ||
      ev.repeat
    ) {
      key = null;
    }

    return key;
  }

  let press: KeyPress;
  function handleKeyDown(ev: KeyboardEvent) {
    const key = getKey(ev);
    if (!key) return;
    press = new KeyPress(config);

    press.down(ev);
    console.log('new press', press, ev);

    setTimeout(() => {
      press.process(true);
    }, 500);
  }
  function handleKeyUp(ev: KeyboardEvent) {
    const key = getKey(ev);
    if (!key) return;
    press?.up(ev);
    press?.process();
  }
  // let timer;
  // let handled = false;
  // function handleKeyDown(ev: KeyboardEvent) {
  //   const key = getKey(ev);
  //   if (!key) return;
  //   handled = false;
  //   clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     if (!handled) handleKeyPress(ev, key, true);
  //     handled = true;
  //   }, 500);
  //   console.log('timer', timer);
  // }
  // function handleKeyUp(ev: KeyboardEvent) {
  //   const key = getKey(ev);
  //   if (!key) return;
  //   clearTimeout(timer);
  //   if (!handled) handleKeyPress(ev, key, false);
  //   handled = true;
  // }

  // document.addEventListener('keydown', handleKeyDown, config.priority === 'high');
  // document.addEventListener('keyup', handleKeyUp, config.priority === 'high');

  return {
    destroy() {
      // document.removeEventListener('keydown', handleKeyDown, config.priority === 'high');
      // document.removeEventListener('keyup', handleKeyUp, config.priority === 'high');
    },
    update(newConfig: Config) {
      config = newConfig;
    },
  };
}
