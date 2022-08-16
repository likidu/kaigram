<script lang="ts">
  import { setContext } from 'svelte';
  import { ContextKey } from '../../enums';
  import type { CardContext } from '../../models';
  import { Route } from '../../services';
  import NavGroup from '../nav/NavGroup.svelte';

  export let cardId: string | null = null;

  setContext<CardContext>(ContextKey.Card, { cardId });
</script>

<NavGroup
  groupId="card"
  enableCardSwitching={true}
  updateRoute={true}
  initialFocusedId={Route.getState().focusedId}
>
  <slot />
</NavGroup>

<style>
  :global([data-nav-group-id='card']) {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--card-color);
    color: var(--text-color);
    border-radius: var(--radius) var(--radius) var(--radius) var(--radius);
    border: 1px solid var(--card-border-color);
  }
</style>
