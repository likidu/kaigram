<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { Color, IconSize } from '../../enums';
  import type { Navigation } from '../../models';
  import Icon from '../icon/Icon.svelte';
  import NavItem from '../nav/NavItem.svelte';

  export let icon: typeof SvelteComponent = null;
  export let title: string;
  export let color: Color = Color.Primary;
  export let disabled = false;
  export let navi: Navigation;
</script>

<NavItem {navi} {disabled}>
  <button class="root" style={`color: ${color};`} {disabled}>
    {#if icon}
      <div class="icon">
        <Icon size={IconSize.Small} {color}><svelte:component this={icon} /></Icon>
      </div>
    {/if}
    {title}
  </button>
</NavItem>

<style>
  .root {
    outline: none;
    border: none;
    background: none;
    width: 100%;
    padding: 5px;
    margin: 5px 0;
    text-transform: uppercase;
    font-weight: var(--bold-font-weight);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon {
    margin-right: 5px;
  }
</style>
