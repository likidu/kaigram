<script lang="ts">
  import { onDestroy } from 'svelte';
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
  import { IconSize, Priority } from '../../enums';
  import { KeyManager } from '../../services';
  import Icon from '../icon/Icon.svelte';

  export let value: number;
  export let valueLabel: string = undefined;
  export let min: number;
  export let max: number;
  export let onChange: (val: number) => void;
  export let disabled = false;

  let keyMan = KeyManager.subscribe(
    {
      onArrowLeft: () => {
        const num = value - 1;
        if (num >= min) {
          onChange(num);
        }
        return true;
      },
      onArrowLeftLong: () => {
        onChange(min);
        return true;
      },
      onArrowRight: () => {
        const num = value + 1;
        if (num <= max) {
          onChange(num);
        }
        return true;
      },
      onArrowRightLong: () => {
        onChange(max);
        return true;
      },
    },
    Priority.High
  );
  $: {
    if (disabled) {
      keyMan.disable();
    } else {
      keyMan.enable();
    }
  }
  onDestroy(() => keyMan.unsubscribe());
</script>

<div class="root">
  <Icon size={IconSize.Small}><MdChevronLeft /></Icon>
  <div>{`${value}${valueLabel ?? ''}`}</div>
  <Icon size={IconSize.Small}><MdChevronRight /></Icon>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    min-height: 24px;
  }
</style>
