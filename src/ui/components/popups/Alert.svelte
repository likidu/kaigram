<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Priority, RenderState } from '../../enums';
  import { KeyManager } from '../../services';
  import { alert } from '../../stores';
  import NavGroup from '../nav/NavGroup.svelte';

  let keyMan = KeyManager.subscribe(
    {
      onSoftLeft: () => true,
      onSoftRight: () => true,
      onEnter: () => {
        alert.close();
        return true;
      },
    },
    Priority.Medium
  );

  onDestroy(() => keyMan.unsubscribe());
</script>

<NavGroup groupId="alert">
  <div class="scrim" class:open={$alert.state === RenderState.Open} />
  <div class="card" class:open={$alert.state >= RenderState.Open}>
    <div class="title">{$alert.data.title}</div>
    <div class="body" data-nav-scroller>
      {$alert.data.body || ''}
    </div>
    <div class="footer">OK</div>
  </div>
</NavGroup>

<style>
  :global([data-nav-group-id='alert']) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
  }

  .scrim {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity var(--animation-speed);
    opacity: 0;
  }
  .scrim.open {
    opacity: 1;
  }

  .card {
    border: 1px solid var(--card-border-color);
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
    background-color: var(--card-color);
    color: var(--text-color);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius) var(--radius) 0 0;
    overflow: hidden;
    transition: transform var(--animation-speed);
    transition-timing-function: ease-in;
    transform: translateY(300px);
    max-height: 80vh;
  }
  .card.open {
    transform: translateY(0);
    transition-timing-function: ease-out;
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    padding: 5px 3px;
    font-weight: var(--bold-font-weight);
    text-align: center;
    flex-shrink: 0;
  }
  .body {
    padding: 5px;
    min-height: 0;
    overflow-y: auto;
  }
  .footer {
    padding: 5px;
    text-align: center;
    font-weight: var(--bold-font-weight);
    flex-shrink: 0;
  }
</style>
