<script lang="ts">
  import type { Navigation } from '../../models';
  import NavItem from '../nav/NavItem.svelte';

  export let label: string;
  export let disabled = false;
  export let navi: Navigation;
</script>

<NavItem {navi} {disabled}>
  <div class="root">
    <div class="content" class:disabled>
      <div>{label}</div>
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
</style>
