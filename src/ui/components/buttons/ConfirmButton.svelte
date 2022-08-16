<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { Color, IconSize } from '../../enums';
  import Icon from '../icon/Icon.svelte';
  import Menu from '../menu/Menu.svelte';
  import MenuItem from '../menu/MenuItem.svelte';
  import NavItem from '../nav/NavItem.svelte';

  export let icon: typeof SvelteComponent = null;
  export let title: string;
  export let menuTitle: string = 'Are you sure?';
  export let confirmText: string = 'Yes';
  export let cancelText: string = 'Cancel';
  export let color: Color = Color.Primary;
  export let disabled = false;

  export let onConfirm: () => void;
  export let onCancel: () => void;

  const itemId = uuidv4();
  let open = false;
</script>

<NavItem
  {disabled}
  navi={{
    itemId,
    onSelect: () => (open = true),
  }}
>
  <button class="root" style={`color: ${color};`} {disabled}>
    {#if icon}
      <div class="icon">
        <Icon size={IconSize.Small} {color}><svelte:component this={icon} /></Icon>
      </div>
    {/if}
    {title}
  </button>
</NavItem>
{#if open}
  <Menu
    title={menuTitle}
    footerText="Select"
    onEnter={() => {
      open = false;
    }}
  >
    <MenuItem
      primaryText={confirmText}
      navi={{
        itemId: '1',
        shortcutKey: '1',
        onSelect: () => {
          onConfirm();
          open = false;
        },
      }}
    />
    <MenuItem
      primaryText={cancelText}
      navi={{
        itemId: '2',
        shortcutKey: '2',
        onSelect: () => {
          onCancel();
          open = false;
        },
      }}
    />
  </Menu>
{/if}

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
