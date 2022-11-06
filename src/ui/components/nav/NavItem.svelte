<script lang="ts">
  import type { ContextMenu, Navigation } from '../../models';
  import { Onyx } from '../../services';

  export let navi: Navigation;
  export let disabled = false;
  export let contextMenu: ContextMenu = null;
  export let display: 'inline-block' | 'block' | 'flex' = 'block';

  function openContextMenu() {
    if (!contextMenu || disabled) return;

    if (contextMenu.onMenu) {
      contextMenu.onMenu();
      return;
    }
    Onyx.contextMenu.open({
      title: contextMenu.title,
      body: contextMenu.body,
      items: contextMenu.items,
    });
  }
</script>

<div
  class="root"
  class:disabled
  style={`display: ${display};`}
  data-onyx-item-id={navi.itemId}
  data-onyx-shortcut={navi.shortcutKey}
  on:onyx:focus={navi.onFocus}
  on:onyx:blur={navi.onBlur}
  on:onyx:select={() => !disabled && navi.onSelect()}
  on:onyx:softleft={navi.onSoftLeft}
  on:onyx:softright={navi.onSoftRight || openContextMenu}
>
  <slot />
</div>

<style>
  :global(.root[data-onyx-focused]) {
    background-color: var(--focus-color);
  }

  .disabled {
    opacity: 0.2;
  }
</style>
