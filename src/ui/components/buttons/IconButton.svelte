<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { Color, IconSize } from '../../enums';
  import type { Navigation } from '../../models';
  import Icon from '../icon/Icon.svelte';
  import NavItem from '../nav/NavItem.svelte';

  export let icon: typeof SvelteComponent;
  export let color: Color = Color.Primary;
  export let disabled = false;
  export let navi: Navigation;
</script>

<NavItem {navi} {disabled} display="inline-block">
  <button class="root" style={`color: ${color};`} {disabled}>
    <Icon size={IconSize.Medium} {color}><svelte:component this={icon} /></Icon>
  </button>
</NavItem>

<style>
  .root {
    outline: none;
    border: none;
    background: none;
    width: 100%;
    padding: 5px;
    text-transform: uppercase;
    font-weight: var(--bold-font-weight);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
