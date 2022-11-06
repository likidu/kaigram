<script lang="ts">
  import { OnyxKeys } from 'onyx-keys';
  import { onDestroy, onMount } from 'svelte';
  import { RenderState } from '../../enums';
  import { settings } from '../../stores';
  import { delay } from '../../utils';
  import NavGroup from '../nav/NavGroup.svelte';

  export let title: string;
  export let footerText: string = 'Save';
  export let disabled = false;
  export let onEnter: () => void;

  let state = RenderState.Destroyed;

  async function open() {
    if (state !== RenderState.Destroyed) return;

    state = RenderState.Closed;
    await delay(50);
    state = RenderState.Open;
    await delay($settings.animationSpeed);
  }
  async function close() {
    if (state !== RenderState.Open) return;

    state = RenderState.Closed;
    await delay($settings.animationSpeed);
    state = RenderState.Destroyed;
  }

  let keyMan = OnyxKeys.subscribe(
    {
      onSoftLeft: async () => {},
      onSoftRight: async () => {},
      onEnter: async () => {
        // TODO: Don't do async things in event handlers
        close().then(onEnter);
      },
    },
    { priority: 1 }
  );

  $: {
    if (disabled) {
      keyMan.disable();
    } else {
      keyMan.enable();
    }
  }
  onDestroy(() => keyMan.unsubscribe());

  onMount(() => open());
</script>

<div class="root">
  <div class="scrim" class:open={state === RenderState.Open} />
  <div class="card" class:open={state === RenderState.Open}>
    <div class="title">{title}</div>
    <NavGroup groupId="menu">
      <slot />
    </NavGroup>
    {#if $settings.showHelpText}
      <div class="footer">{footerText}</div>
    {/if}
  </div>
</div>

<style>
  .root {
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
  }
  .footer {
    padding: 5px;
    text-align: center;
    font-weight: var(--bold-font-weight);
  }
</style>
