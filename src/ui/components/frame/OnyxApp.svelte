<script lang="ts">
  import { Priority, RenderState, TextSize, TextWeight, ViewState } from '../../enums';
  import { Onyx, KeyManager } from '../../services';
  import { alert, appMenu, contextMenu, dialog, settings, toaster } from '../../stores';
  import { updateView, view } from '../../stores/view';
  import { applyTheme } from '../../themes';

  import ContextMenu from '../contextMenu/ContextMenu.svelte';
  import Alert from '../popups/Alert.svelte';
  import Dialog from '../popups/Dialog.svelte';
  import Toaster from '../toaster/Toaster.svelte';

  KeyManager.startListening();

  const keyMan = KeyManager.subscribe(
    {
      onSoftLeft: () => {
        if ($appMenu.state === RenderState.Destroyed) {
          Onyx.appMenu.open();
        } else if ($appMenu.state === RenderState.Open) {
          Onyx.appMenu.close();
        }
        return true;
      },
      onSoftLeftLong: () => {
        if ($view.viewing === ViewState.Card && $view.cards.length > 1) {
          updateView({ viewing: ViewState.Stack });
        } else {
          updateView({ viewing: ViewState.Card });
        }
        return true;
      },
      // onBackspace: () => {
      //   if ($appMenu.state === RenderState.Open) {
      //     Onyx.appMenu.close();
      //     return true;
      //   }

      //   if ($contextMenu.state === RenderState.Open) {
      //     Onyx.contextMenu.close();
      //     return true;
      //   }

      //   if ($view.viewing === ViewState.Stack) {
      //     updateView({ viewing: ViewState.Card });
      //     return true;
      //   }
      // },
    },
    Priority.Low
  );

  // Apply settings
  $: {
    // Theme
    applyTheme($settings);

    if ($settings.shortcutKeyColor === 'accent') {
      document.documentElement.style.setProperty('--shortcut-color', `var(--accent-color)`);
    } else if ($settings.shortcutKeyColor === 'secondary') {
      document.documentElement.style.setProperty('--shortcut-color', `var(--secondary-text-color)`);
    } else {
      document.documentElement.style.setProperty('--shortcut-color', `var(--primary-text-color)`);
    }

    // Text Size
    const textSize = {
      [TextSize.Smallest]: 8,
      [TextSize.Small]: 9,
      [TextSize.Medium]: 10,
      [TextSize.Large]: 11,
      [TextSize.Largest]: 12,
    };
    document.documentElement.style.setProperty(
      '--base-font-size',
      `${textSize[$settings.textSize]}px`
    );

    const weight = {
      [TextWeight.Light]: { regular: 300, bold: 400 },
      [TextWeight.Medium]: { regular: 400, bold: 600 },
      [TextWeight.Heavy]: { regular: 600, bold: 700 },
    };
    document.documentElement.style.setProperty(
      '--regular-font-weight',
      `${weight[$settings.textWeight].regular}`
    );
    document.documentElement.style.setProperty(
      '--bold-font-weight',
      `${weight[$settings.textWeight].bold}`
    );

    // Display Density
    document.body.dataset.density = $settings.displayDensity;

    // Border Radius
    document.documentElement.style.setProperty('--radius', `${$settings.borderRadius}px`);

    // Animations
    document.documentElement.style.setProperty(
      '--animation-speed',
      `${$settings.animationSpeed}ms`
    );
  }
</script>

<main class="root">
  <div class="view">
    <slot />
  </div>
  <div class="dashboard">
    <slot name="dashboard" />
  </div>
  {#if $appMenu.state !== RenderState.Destroyed}
    <div class="menu-container">
      <div class="scrim" class:open={$appMenu.state === RenderState.Open} />
      <div class="menu" class:open={$appMenu.state === RenderState.Open}>
        <slot name="app-menu" />
      </div>
    </div>
  {/if}
  {#if $contextMenu.state !== RenderState.Destroyed}
    <ContextMenu />
  {/if}
  {#if $toaster.state !== RenderState.Destroyed}
    <Toaster />
  {/if}
  {#if $alert.state !== RenderState.Destroyed}
    <Alert />
  {/if}
  {#if $dialog.state !== RenderState.Destroyed}
    <Dialog />
  {/if}
</main>

<style lang="postcss">
  .root {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .view {
    flex: 1;
  }

  .menu-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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

  .menu {
    transform: translateX(-100%);
    transition: transform var(--animation-speed);
    transition-timing-function: ease-in;
    height: 100vh;
    width: 85vw;
  }

  .menu.open {
    transition-timing-function: ease-out;
    transform: translateX(0%);
  }
</style>