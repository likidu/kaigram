<script lang="ts">
  import { getContext } from 'svelte';
  import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
  import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
  import { ContextKey, IconSize } from '../../enums';
  import type { CardContext } from '../../models';
  import { view } from '../../stores/view';
  import Icon from '../icon/Icon.svelte';

  export let title: string = undefined;

  const context = getContext<CardContext>(ContextKey.Card);

  const cardTitle = $view.cards.find((a) => a.id === context.cardId)?.title;

  let hasCards = false;
  let hasPrevCard = false;
  let hasNextCard = false;
  $: {
    hasCards = $view.cards.length > 1;

    const index = $view.cards.findIndex((a) => a.id === $view.activeCardId);
    hasPrevCard = $view.wrapCards ? true : !!$view.cards[index - 1];
    hasNextCard = $view.wrapCards ? true : !!$view.cards[index + 1];
  }
</script>

<div class="root">
  {#if hasCards && hasPrevCard}
    <Icon size={IconSize.Small}><MdChevronLeft /></Icon>
  {/if}
  <div
    class="title"
    class:pad-left={!hasPrevCard && hasNextCard}
    class:pad-right={!hasNextCard && hasPrevCard}
  >
    {title ?? cardTitle}
  </div>
  {#if hasCards && hasNextCard}
    <Icon size={IconSize.Small}><MdChevronRight /></Icon>
  {/if}
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 3px;
  }

  .title {
    flex: 1;
    font-weight: var(--bold-font-weight);
    text-align: center;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pad-left {
    margin-left: 18px;
  }
  .pad-right {
    margin-right: 18px;
  }
</style>
