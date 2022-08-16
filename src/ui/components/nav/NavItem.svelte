<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextKey } from '../../enums';
  import type { ContextMenu, Navigation } from '../../models';
  import { Onyx } from '../../services';
  import { groupItemMap } from '../../stores/navigator';

  export let navi: Navigation;
  export let contextMenu: ContextMenu = null;
  export let highlight = true;
  export let disabled = false;
  export let display: 'inline-block' | 'block' = 'block';

  const groupId = getContext<string>(ContextKey.NavGroup);

  let focused = false;
  $: focused = $groupItemMap[groupId] === navi.itemId;
</script>

<div
  class="root"
  class:focused={highlight && focused}
  class:disabled
  style={`display: ${display};`}
  data-nav-id={navi.itemId}
  data-nav-shortcut={navi.shortcutKey}
  on:itemfocus={navi.onFocus}
  on:itemblur={navi.onBlur}
  on:itemselect={() => !disabled && navi.onSelect()}
  on:itemmenu={() => {
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
  }}
>
  <slot />
</div>

<style>
  .focused {
    background-color: var(--focus-color);
  }
  .disabled {
    opacity: 0.2;
  }
</style>
