<script lang="ts">
  import { ViewState } from '../../enums';
  import { settings } from '../../stores';
  import { groupItemMap } from '../../stores/navigator';
  import { updateView, view } from '../../stores/view';
  import { getShortcutFromIndex } from '../../utils';
  import NavGroup from '../nav/NavGroup.svelte';

  const NAV_GROUP_ID = 'cards';
</script>

<NavGroup groupId={NAV_GROUP_ID}>
  <div data-nav-scroller>
    {#each $view.cards as card, i}
      <div class="card-root">
        <div
          class="card"
          class:focused={card.id === $groupItemMap[NAV_GROUP_ID]}
          data-nav-id={card.id}
          data-nav-shortcut={i + 1}
          on:itemselect={() => updateView({ viewing: ViewState.Card, activeCardId: card.id })}
        >
          {#if $settings.shortcutKeyLocation === 'left' && getShortcutFromIndex(i)}
            <div class="shortcut">{getShortcutFromIndex(i)}</div>
          {/if}
          <div class="title">{card.title}</div>
          {#if $settings.shortcutKeyLocation === 'right' && getShortcutFromIndex(i)}
            <div class="shortcut">{getShortcutFromIndex(i)}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</NavGroup>

<style>
  :global([data-nav-group-id='cards']) {
    border-radius: var(--radius) var(--radius) 0 0;
  }
  .card-root {
    background-color: var(--card-color);
    color: var(--text-color);

    border-radius: var(--radius) var(--radius) 0 0;
    padding-bottom: 20px;
    margin-bottom: -20px;
    border: 1px solid var(--card-border-color);
    overflow: hidden;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
  }
  .card {
    padding: 5px 7px;
    padding-bottom: 20px;
    margin-bottom: -15px;
    display: flex;
    font-weight: var(--bold-font-weight);
  }
  .title {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
  .shortcut {
    color: var(--shortcut-color);
  }
  .shortcut:first-child {
    margin-right: 5px;
  }
  .shortcut:last-child {
    margin-left: 5px;
  }
  .card.focused {
    background-color: var(--focus-color);
  }
</style>
