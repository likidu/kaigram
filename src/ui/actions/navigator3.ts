import { tick } from 'svelte';
import { get } from 'svelte/store';
import { Route } from '../services';
import {
  activateGroup,
  activeGroup,
  deactivateGroup,
  getFocusedItemId,
  setSelectedId,
} from '../stores/navigator';

type Config = {
  groupId: string;
  initialFocusedId?: string;
  enableCardSwitching?: boolean;
  updateRoute?: boolean;
  viewLoaded?: boolean;
  layout?: 'list' | 'grid';
};

export function navigator(node: HTMLElement, config: Config) {
  node.dataset.navGroupId = config.groupId;

  activateGroup(config.groupId);

  function setInitial(itemId?: string) {
    if (itemId) {
      const item: HTMLElement = node.querySelector(`[data-nav-id="${itemId}"]`);
      if (item) {
        setSelectedId(config.groupId, itemId);
        item?.dispatchEvent(new CustomEvent('itemfocus'));
        const scroller: HTMLElement = node.querySelector(`[data-nav-scroller]`);
        scrollIntoView(scroller, item, 'auto');
      }
    }
  }

  function handleKeyPress(ev: KeyboardEvent) {
    const groupActive = get(activeGroup)?.id === config.groupId;

    // Check if valid key
    const target = ev.target as HTMLElement | null;
    const dpadKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
    const shortcutKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (
      !groupActive ||
      ev.shiftKey || // Allow Shift+ArrowLeft/Right to trigger soft keys
      ![...dpadKeys, ...shortcutKeys].includes(ev.key) ||
      (!['ArrowUp', 'ArrowDown', 'Enter'].includes(ev.key) &&
        target?.tagName.toLowerCase() === 'input') ||
      (!['ArrowUp', 'ArrowDown', 'Enter'].includes(ev.key) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (target?.attributes as any).role?.value === 'textbox')
    ) {
      return;
    }

    // Handle card switching first
    // if (config.enableCardSwitching && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
    //   switchCard(ev.key === 'ArrowLeft' ? -1 : 1);
    //   return;
    // }

    const scroller: HTMLElement = node.querySelector(`[data-nav-scroller]`);

    const focusedItemId = getFocusedItemId(config.groupId);
    const items: HTMLElement[] = Array.from(node.querySelectorAll(`[data-nav-id]`));
    const currentItemIndex = items.findIndex((a) => a.dataset.navId === focusedItemId);

    // Handle Enter key
    if (items[currentItemIndex] && ev.key === 'Enter') {
      items[currentItemIndex].dispatchEvent(new CustomEvent('itemfocus'));
      items[currentItemIndex].dispatchEvent(new CustomEvent('itemselect'));
      return;
    } else if (ev.key === 'Enter') {
      return;
    }

    // Handle shortcut keys
    const shortcutItem = items.find((a) => a.dataset.navShortcut === ev.key);
    if (shortcutItem) {
      scrollIntoView(scroller, shortcutItem, 'auto');
      setSelectedId(config.groupId, shortcutItem.dataset.navId);

      if (config.updateRoute) {
        Route.updateState({ focusedId: shortcutItem.dataset.navId });
      }

      items[currentItemIndex]?.dispatchEvent(new CustomEvent('itemblur'));
      shortcutItem.dispatchEvent(new CustomEvent('itemfocus'));
      shortcutItem.dispatchEvent(new CustomEvent('itemselect'));

      return;
    } else if (shortcutKeys.includes(ev.key)) {
      return;
    }

    let nextItem = null;

    const item = new Item(items[currentItemIndex], items);
    switch (ev.key) {
      case 'ArrowUp':
        nextItem = item.findTop();
        break;
      case 'ArrowDown':
        nextItem = item.findBottom();
        break;
      case 'ArrowLeft':
        nextItem = item.findLeft();
        break;
      case 'ArrowRight':
        nextItem = item.findRight();
        break;
    }

    console.log('nextItem', nextItem);

    if (!nextItem) return;

    // If at first item and more content above, scroll up
    if (
      scroller &&
      (items.length === 0 || currentItemIndex === 0) &&
      ev.key === 'ArrowUp' &&
      scroller.scrollTop > 0
    ) {
      scrollContent('up', scroller);
      return;
    }

    // If at last item and more content below, scroll down
    if (
      scroller &&
      currentItemIndex === items.length - 1 &&
      ev.key === 'ArrowDown' &&
      scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight
    ) {
      scrollContent('down', scroller);
      return;
    }

    // Find next item and scroll to it

    // if (ev.key === 'ArrowUp' && currentItemIndex === 0) {
    //   nextItem = null;
    // } else {
    //   const idx = getIndex(items, currentItemIndex, ev.key === 'ArrowUp' ? -1 : 1, true);
    //   nextItem = items[idx];
    // }

    setSelectedId(config.groupId, nextItem?.dataset?.navId);
    items[currentItemIndex]?.dispatchEvent(new CustomEvent('itemblur'));
    nextItem?.dispatchEvent(new CustomEvent('itemfocus'));

    scrollIntoView(scroller, nextItem, 'smooth');

    if (config.updateRoute) {
      Route.updateState({ focusedId: nextItem?.dataset.navId });
    }
  }

  function scrollContent(direction: 'up' | 'down', scroller?: HTMLElement): boolean {
    if (!scroller) return;

    scroller.scrollBy({
      top: (scroller.clientHeight / 3) * (direction === 'up' ? -1 : 1),
      behavior: 'smooth',
    });
  }

  function scrollIntoView(
    scroller?: HTMLElement,
    item?: HTMLElement,
    behavior: 'smooth' | 'auto' = 'auto'
  ): boolean {
    if (!scroller || !item) {
      return;
    }

    const rect = item.getBoundingClientRect();
    const topDiff = scroller.offsetTop - rect.top;
    const bottomDiff = rect.bottom - (scroller.offsetHeight + scroller.offsetTop);

    scroller.scrollBy({
      top: topDiff > 0 ? -topDiff : bottomDiff > 0 ? bottomDiff : 0,
      behavior,
    });

    return true;
  }

  document.addEventListener('keydown', handleKeyPress, false);

  return {
    destroy() {
      document.removeEventListener('keydown', handleKeyPress, false);
      deactivateGroup(config.groupId);
    },
    async update(newConfig: Config) {
      // Set initial focus only after data loaded and rendered
      if (!config.viewLoaded && newConfig.viewLoaded && newConfig.initialFocusedId) {
        await tick();
        setInitial(newConfig.initialFocusedId);
      }

      config = newConfig;
    },
  };
}

type Dimens = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type ElementWithDimens = {
  element: HTMLElement;
  dimens: Dimens;
};

class Item {
  feeler = 15;
  current?: ElementWithDimens;
  others: ElementWithDimens[];
  neighbors: {
    top: HTMLElement | null;
    bottom: HTMLElement | null;
    left: HTMLElement | null;
    right: HTMLElement | null;
  };

  constructor(element: HTMLElement, all: HTMLElement[]) {
    if (element) {
      this.current = {
        element,
        dimens: element?.getBoundingClientRect() || {
          top: 0,
          bottom: 0,
          left: 0,
          right: document.documentElement.clientWidth,
        },
      };
    }
    this.others = all
      .filter((a) => a !== element)
      .map((a) => ({
        element: a,
        dimens: a.getBoundingClientRect(),
      }));

    // console.log('current', this.current.dimens);
    // console.log('all', this.all);

    // this.neighbors = {
    //   top: this.findTop(),
    //   bottom: this.findBottom(),
    //   left: this.findLeft(),
    //   right: this.findRight(),
    // };

    // console.log('neighbors', this.neighbors);
  }

  findTop(): HTMLElement | null {
    if (!this.current) {
      return this.others.at(-1).element;
    }
    const found = this.others.filter((a) => {
      if (a.dimens.bottom > this.current.dimens.top) {
        return false;
      }
      if (a.dimens.bottom - this.current.dimens.top > this.feeler) {
        return false;
      }
      if (
        !this.overlapV(
          this.current.dimens.left,
          this.current.dimens.right,
          a.dimens.left,
          a.dimens.right
        )
      ) {
        return false;
      }

      return true;
    });

    return found.at(-1)?.element || null;
  }

  findBottom(): HTMLElement | null {
    if (!this.current) {
      return this.others[0].element;
    }

    const found = this.others.filter((a) => {
      if (a.dimens.top < this.current.dimens.bottom) {
        return false;
      }
      if (a.dimens.top - this.current.dimens.bottom > this.feeler) {
        return false;
      }
      if (
        !this.overlapV(
          this.current.dimens.left,
          this.current.dimens.right,
          a.dimens.left,
          a.dimens.right
        )
      ) {
        return false;
      }

      return true;
    });

    return found[0]?.element || null;
  }

  findLeft(): HTMLElement | null {
    if (!this.current) {
      return null;
    }
    const found = this.others.filter((a) => {
      if (a.dimens.right > this.current.dimens.left) {
        return false;
      }
      if (this.current.dimens.left - a.dimens.right > this.feeler) {
        return false;
      }
      if (
        !this.overlapH(
          this.current.dimens.top,
          this.current.dimens.bottom,
          a.dimens.top,
          a.dimens.bottom
        )
      ) {
        return false;
      }

      return true;
    });

    return found.at(-1)?.element || null;
  }

  findRight(): HTMLElement | null {
    if (!this.current) {
      return null;
    }
    const found = this.others.filter((a) => {
      if (a.dimens.left < this.current.dimens.right) {
        return false;
      }
      if (this.current.dimens.right - a.dimens.left > this.feeler) {
        return false;
      }
      if (
        !this.overlapH(
          this.current.dimens.top,
          this.current.dimens.bottom,
          a.dimens.top,
          a.dimens.bottom
        )
      ) {
        return false;
      }

      return true;
    });

    return found.at(0)?.element || null;
  }

  overlapV(
    sourceLeft: number,
    sourceRight: number,
    otherLeft: number,
    otherRight: number
  ): boolean {
    if (otherLeft >= sourceLeft && otherRight <= sourceRight) return true;
    if (otherLeft <= sourceLeft && otherRight >= sourceRight) return true;
    if (otherRight >= sourceLeft && otherRight <= sourceRight) return true;
    if (otherLeft <= sourceRight && otherLeft >= sourceLeft) return true;
    // if (otherRight >= sourceLeft) return true;
    // if (otherLeft >= sourceLeft) return true;
    // else if (otherRight <= sourceRight) return true;

    return false;
  }

  overlapH(
    sourceTop: number,
    sourceBottom: number,
    otherTop: number,
    otherBottom: number
  ): boolean {
    if (otherTop >= sourceTop && otherBottom <= sourceBottom) return true;
    if (otherTop <= sourceTop && otherBottom >= sourceBottom) return true;

    return false;
  }
}
