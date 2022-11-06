<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy } from 'svelte';
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
  import { IconSize } from '../../enums/iconSize';
  import type { SelectOption } from '../../models';
  import { getIndex } from '../../utils';
  import Icon from '../icon/Icon.svelte';

  export let value: string | number = undefined;
  export let options: SelectOption[] = [];
  export let onChange: (val: string | number) => void;
  export let disabled = false;
  export let wrap = false;

  let hasNext;
  let hasPrev;
  $: {
    const index = options.findIndex((a) => a.id === value);
    hasNext = wrap || !!options[index + 1];
    hasPrev = wrap || !!options[index - 1];
  }

  let keyMan = OnyxKeys.subscribe(
    {
      onArrowLeft: async () => {
        const index = options.findIndex((a) => a.id === value);
        const newIndex = getIndex(options, index, -1, wrap);
        onChange(options[newIndex].id);
      },
      onArrowLeftLong: async () => {
        onChange(options[0].id);
      },
      onArrowRight: async () => {
        const index = options.findIndex((a) => a.id === value);
        const newIndex = getIndex(options, index, 1, wrap);
        onChange(options[newIndex].id);
      },
      onArrowRightLong: async () => {
        onChange(options[options.length - 1].id);
      },
    },
    { priority: 4 }
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
  <Icon size={IconSize.Small} disabled={!hasPrev}><MdChevronLeft /></Icon>
  <div class="title">{options.find((a) => a.id === value)?.label ?? '?'}</div>
  <Icon size={IconSize.Small} disabled={!hasNext}><MdChevronRight /></Icon>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    min-height: 24px;
  }
</style>
