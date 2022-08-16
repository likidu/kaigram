<script lang="ts">
  import MdExpandMore from 'svelte-icons/md/MdExpandMore.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { IconSize } from '../../enums';
  import type { SelectOption } from '../../models';
  import { getShortcutFromIndex } from '../../utils';
  import Icon from '../icon/Icon.svelte';
  import Menu from '../menu/Menu.svelte';
  import MenuItem from '../menu/MenuItem.svelte';
  import FormRow from './FormRow.svelte';

  export let label: string = undefined;
  export let value: string | number = undefined;
  export let options: SelectOption[];
  export let disabled = false;
  export let onChange: (val: string | number) => void;

  const itemId = uuidv4();
  let open = false;
</script>

<FormRow
  {label}
  {disabled}
  navi={{
    itemId,
    onSelect: () => (open = true),
  }}
>
  <div class="select">
    {options.find((a) => a.id === value)?.label}
    <Icon size={IconSize.Small}><MdExpandMore /></Icon>
  </div>
</FormRow>
{#if open}
  <Menu
    title={label}
    onEnter={() => {
      open = false;
    }}
  >
    {#each options as option, i}
      <MenuItem
        primaryText={option.label}
        navi={{
          itemId: `${i + 1}`,
          shortcutKey: getShortcutFromIndex(i),
          onSelect: () => {
            onChange(option.id);
            open = false;
          },
        }}
      />
    {/each}
  </Menu>
{/if}

<style>
  .select {
    min-height: 24px;
    display: flex;
    align-items: center;
  }
</style>
