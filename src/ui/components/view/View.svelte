<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ViewState } from '../../enums';
  import { Onyx } from '../../services';
  import { resetNavigation } from '../../stores/navigator';
  import { resetView, view } from '../../stores/view';
  import ViewCards from './ViewCards.svelte';

  let cardsHeight: number | null = null;

  onDestroy(() => {
    resetView();
    resetNavigation();
    Onyx.contextMenu.reset();
  });
</script>

<div class="root">
  {#if $view.viewing === ViewState.Stack}
    <div bind:clientHeight={cardsHeight}>
      <ViewCards />
    </div>
  {/if}
  <div
    class="content"
    style={`transform: translateY(${$view.viewing === ViewState.Stack ? cardsHeight : 0}px)`}
  >
    <slot />
  </div>
</div>

<style>
  .root {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: transform var(--animation-speed);
    transition-timing-function: ease-in-out;
    transform: translateY(0px);
    z-index: 9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
    border-radius: var(--radius) var(--radius) 0 0;
  }
</style>
