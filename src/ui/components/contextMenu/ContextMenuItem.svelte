<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { IconSize } from '../../enums';
  import type { Navigation } from '../../models';
  import { settings } from '../../stores';
  import Icon from '../icon/Icon.svelte';
  import NavItem from '../nav/NavItem.svelte';

  export let icon: typeof SvelteComponent = null;
  export let imageUrl: string = null;
  export let text: string;
  export let workingText: string = null;
  export let working = false;
  export let navi: Navigation;
</script>

<NavItem {navi}>
  <div class="root">
    {#if $settings.shortcutKeyLocation === 'left' && navi.shortcutKey}
      <div class="shortcut">{navi.shortcutKey}</div>
    {/if}
    {#if icon}
      <div class="icon">
        <Icon size={IconSize.Small}><svelte:component this={icon} /></Icon>
      </div>
    {/if}
    {#if imageUrl}
      <img class="image" src={imageUrl} alt="" />
    {/if}
    <div class="container">
      {#if working}
        <div class="primary">{workingText || `${text}...`}</div>
      {:else}
        <div class="primary">{working ? workingText : text}</div>
      {/if}
    </div>
    {#if $settings.shortcutKeyLocation === 'right' && navi.shortcutKey}
      <div class="shortcut">{navi.shortcutKey}</div>
    {/if}
  </div>
</NavItem>

<style>
  .root {
    padding: 7px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
  }

  .icon {
    margin-right: 10px;
  }

  .image {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    border-radius: 3px;
  }
  .container {
    flex: 1;
    min-width: 0;
  }

  .shortcut {
    font-weight: var(--bold-font-weight);
    color: var(--shortcut-color);
  }
  .shortcut:first-child {
    margin-right: 5px;
  }
  .shortcut:last-child {
    margin-left: 5px;
  }

  .primary {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
