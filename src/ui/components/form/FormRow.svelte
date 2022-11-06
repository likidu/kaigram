<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { IconSize } from '../../enums';

  import type { ContextMenu, Navigation } from '../../models';
  import Icon from '../icon/Icon.svelte';
  import NavItem from '../nav/NavItem.svelte';

  export let label: string = null;
  export let icon: typeof SvelteComponent = null;
  export let disabled = false;
  export let align: 'left' | 'right' | 'edges' = 'edges';
  export let navi: Navigation;
  export let contextMenu: ContextMenu = null;
</script>

<NavItem {navi} {disabled} {contextMenu}>
  <div class="root">
    <div
      class="content"
      class:disabled
      class:align-left={align === 'left'}
      class:align-right={align === 'right'}
      class:align-edges={align === 'edges'}
    >
      {#if icon}
        <div class="icon">
          <Icon size={IconSize.Smallest}><svelte:component this={icon} /></Icon>
        </div>
      {/if}
      {#if label}
        <div>{label}</div>
      {/if}
      <slot />
    </div>
  </div>
</NavItem>

<style>
  .root {
    border-bottom: 1px solid var(--divider-color);
  }
  .content {
    padding: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    overflow: hidden;
  }

  .content.align-left {
    justify-content: start;
  }

  .content.align-right {
    justify-content: end;
  }

  .content.align-edges {
    justify-content: space-between;
  }

  .icon {
    margin-right: 10px;
  }
</style>
