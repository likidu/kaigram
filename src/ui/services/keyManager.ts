import { Priority } from '../enums';
import { generateId } from '../utils';

type HandlerKey =
  | 'onArrowUp'
  | 'onArrowUpLong'
  | 'onArrowDown'
  | 'onArrowDownLong'
  | 'onArrowLeft'
  | 'onArrowLeftLong'
  | 'onArrowRight'
  | 'onArrowRightLong'
  | 'onEnter'
  | 'onEnterLong'
  | 'onBackspace'
  | 'onBackspaceLong'
  | 'onSoftLeft'
  | 'onSoftLeftLong'
  | 'onSoftRight'
  | 'onSoftRightLong';

type Handler = {
  ownerId: string;
  key: HandlerKey;
  priority: Priority;
  disabled: boolean;
  fn: () => boolean;
};

type NewHandlerMap = { [key in HandlerKey]?: () => boolean };

export class KeyManager {
  private static activeKey: string;
  private static handledKey: string;
  private static listening = false;
  private static timerId: NodeJS.Timeout = null;
  private static handlers: Handler[] = [];
  private static keyPressHandled = false;
  private static downEv: KeyboardEvent;
  private static upEv: KeyboardEvent;

  static startListening() {
    if (this.listening) return;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));

    this.listening = true;
  }

  static stopListening() {
    if (!this.listening) return;

    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  static subscribe(handlerMap: NewHandlerMap, priority: Priority = Priority.Medium) {
    const ownerId = generateId();

    const handlers: Handler[] = Object.entries(handlerMap).map(([key, value]) => {
      return {
        ownerId,
        priority,
        disabled: false,
        key: key as HandlerKey,
        fn: value,
      };
    });

    this.handlers = [...this.handlers, ...handlers];

    // console.log('subscribe', ownerId);

    return {
      disable: () => this.disable(ownerId),
      enable: () => this.enable(ownerId),
      unsubscribe: () => this.unsubscribe(ownerId),
    };
  }

  static unsubscribe(ownerId: string) {
    // console.log('unsubscribe', ownerId);
    this.handlers = this.handlers.filter((a) => a.ownerId !== ownerId);
  }

  static disable(ownerId: string) {
    // console.log('disable', ownerId);
    this.handlers = this.handlers.map((a) =>
      a.ownerId !== ownerId
        ? a
        : {
            ...a,
            disabled: true,
          }
    );
  }

  static enable(ownerId: string) {
    // console.log('enable', ownerId);
    this.handlers = this.handlers.map((a) =>
      a.ownerId !== ownerId
        ? a
        : {
            ...a,
            disabled: false,
          }
    );
  }

  private static handleKeyPress(handlerKey: HandlerKey) {
    const handlers = this.handlers
      .filter((a) => a.key === handlerKey && !a.disabled)
      .sort((a, b) => {
        if (a.priority > b.priority) return 1;
        if (a.priority < b.priority) return -1;
        return 0;
      });
    const handler = handlers[handlers.length - 1];

    if (!handler) return;
    // console.log('handleKeyPress', handlerKey, handler);

    const handled = handler.fn();

    if (handled) {
      this.handledKey = this.activeKey;
      this.downEv?.stopPropagation();
      this.downEv?.stopImmediatePropagation();
      this.downEv?.preventDefault();
      this.upEv?.stopPropagation();
      this.upEv?.stopImmediatePropagation();
      this.upEv?.preventDefault();
    }
  }

  private static onKeyDown(ev: KeyboardEvent) {
    const key = this.parseKey(ev);

    if (!key) return;

    this.handledKey = null;
    this.activeKey = key;
    this.keyPressHandled = false;
    this.downEv = ev;

    this.timerId = setTimeout(() => {
      this.keyPressHandled = true;
      this.handleKeyPress(`on${key}Long` as HandlerKey);
    }, 500);
  }

  private static onKeyUp(ev: KeyboardEvent) {
    const key = this.parseKey(ev);

    if (key && key === this.handledKey) {
      ev.stopImmediatePropagation();
      ev.stopPropagation();
      ev.preventDefault();
    }

    if (!key || key !== this.activeKey) return;

    this.upEv = ev;
    clearTimeout(this.timerId);
    if (this.keyPressHandled) {
      return;
    }
    this.handleKeyPress(`on${key}` as HandlerKey);
  }

  private static parseKey(ev: KeyboardEvent): string | null {
    let key: string | null = ev.key;

    if (ev.shiftKey && ev.key === 'ArrowLeft') {
      key = 'SoftLeft';
    }
    if (ev.shiftKey && ev.key === 'ArrowRight') {
      key = 'SoftRight';
    }

    const validKeys = [
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
      !validKeys.includes(key) ||
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