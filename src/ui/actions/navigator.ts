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
import { switchCard } from '../stores/view';
import { getIndex } from '../utils';

type Config = {
  groupId: string;
  initialFocusedId?: string;
  enableCardSwitching?: boolean;
  enableShortcuts?: boolean;
  updateRoute?: boolean;
  viewLoaded?: boolean;
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
    const key = parseKey(ev);

    const groupActive = get(activeGroup)?.id === config.groupId;

    // Check if valid key
    const target = ev.target as HTMLElement | null;
    const dpadKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'SoftRight'];
    const shortcutKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (
      !groupActive ||
      ![...dpadKeys, ...shortcutKeys].includes(key) ||
      (shortcutKeys.includes(key) && !config.enableShortcuts) ||
      (!['ArrowUp', 'ArrowDown', 'Enter'].includes(key) &&
        target?.tagName.toLowerCase() === 'input') ||
      (!['ArrowUp', 'ArrowDown', 'Enter'].includes(key) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (target?.attributes as any).role?.value === 'textbox')
    ) {
      return;
    }

    // Handle card switching first
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      if (config.enableCardSwitching) switchCard(key === 'ArrowLeft' ? -1 : 1);
      return;
    }

    const scroller: HTMLElement = node.querySelector(`[data-nav-scroller]`);

    const focusedItemId = getFocusedItemId(config.groupId);
    const items: HTMLElement[] = Array.from(node.querySelectorAll(`[data-nav-id]`));
    const currentItemIndex = items.findIndex((a) => a.dataset.navId === focusedItemId);

    // Handle Enter key
    if (key === 'Enter') {
      items[currentItemIndex]?.dispatchEvent(new CustomEvent('itemfocus'));
      items[currentItemIndex]?.dispatchEvent(new CustomEvent('itemselect'));
      return;
    }

    // Handle SoftRight key
    if (key === 'SoftRight') {
      items[currentItemIndex]?.dispatchEvent(new CustomEvent('itemmenu'));
      return;
    }

    // Handle shortcut keys
    const shortcutItem = items.find((a) => a.dataset.navShortcut === key);
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
    } else if (shortcutKeys.includes(key)) {
      return;
    }

    // If at first item and more content above, scroll up
    if (
      scroller &&
      (items.length === 0 || currentItemIndex === 0) &&
      key === 'ArrowUp' &&
      scroller.scrollTop > 0
    ) {
      scrollContent('up', scroller);
      return;
    }

    // If at last item and more content below, scroll down
    if (
      scroller &&
      currentItemIndex === items.length - 1 &&
      key === 'ArrowDown' &&
      scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight
    ) {
      scrollContent('down', scroller);
      return;
    }

    // Find next item and scroll to it
    let nextItem = null;
    if (key === 'ArrowUp' && currentItemIndex === 0) {
      nextItem = null;
    } else {
      const idx = getIndex(items, currentItemIndex, key === 'ArrowUp' ? -1 : 1, true);
      nextItem = items[idx];
    }

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

  function parseKey(ev: KeyboardEvent): string {
    // Simulate soft keys for testing purposes
    if (ev.shiftKey && ev.key === 'ArrowLeft') {
      return 'SoftLeft';
    }
    if (ev.shiftKey && ev.key === 'ArrowRight') {
      return 'SoftRight';
    }
    return ev.key;
  }

  document.addEventListener('keyup', handleKeyPress, false);

  return {
    destroy() {
      document.removeEventListener('keyup', handleKeyPress, false);
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
