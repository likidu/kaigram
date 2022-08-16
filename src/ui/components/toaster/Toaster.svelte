<script lang="ts">
  import MdCheck from 'svelte-icons/md/MdCheck.svelte';
  import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';
  import MdInfoOutline from 'svelte-icons/md/MdInfoOutline.svelte';
  import MdWarning from 'svelte-icons/md/MdWarning.svelte';
  import { IconSize, RenderState } from '../../enums';
  import { settings, toaster } from '../../stores';
  import Icon from '../icon/Icon.svelte';
</script>

<div
  class="root"
  class:top={$settings.toasterLocation === 'top'}
  class:bottom={$settings.toasterLocation === 'bottom'}
  class:open={$toaster.state === RenderState.Open}
>
  {#if $settings.toasterLocation === 'bottom'}
    <div class="header" />
  {/if}
  <div
    class="toast"
    class:warning={$toaster.data.type === 'warning'}
    class:error={$toaster.data.type === 'error'}
    class:success={$toaster.data.type === 'success'}
  >
    {#if $toaster.data.type === 'info'}
      <div class="icon">
        <Icon size={IconSize.Small} color="var(--app-text-color)">
          <svelte:component this={$toaster.data.icon || MdInfoOutline} />
        </Icon>
      </div>
    {:else if $toaster.data.type === 'warning'}
      <div class="icon">
        <Icon size={IconSize.Small} color="var(--warning-color)">
          <svelte:component this={$toaster.data.icon || MdWarning} />
        </Icon>
      </div>
    {:else if $toaster.data.type === 'error'}
      <div class="icon">
        <Icon size={IconSize.Small} color="var(--error-color)">
          <svelte:component this={$toaster.data.icon || MdErrorOutline} />
        </Icon>
      </div>
    {:else if $toaster.data.type === 'success'}
      <div class="icon">
        <Icon size={IconSize.Small} color="var(--success-color)">
          <svelte:component this={$toaster.data.icon || MdCheck} />
        </Icon>
      </div>
    {/if}
    <div class="text">
      {$toaster.data?.title}
    </div>
  </div>
  {#if $settings.toasterLocation === 'top'}
    <div class="footer" />
  {/if}
</div>

<style>
  .root {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 9;
    transition: transform calc(var(--animation-speed) * 2);
    transition-timing-function: ease-in;
    transform: translateY(0px);
    display: flex;
    flex-direction: column;
  }
  .root.top {
    bottom: 100vh;
  }
  .root.top.open {
    transform: translateY(100%);
    transition-timing-function: ease-out;
  }
  .root.bottom {
    top: 100vh;
  }
  .root.bottom.open {
    transform: translateY(-100%);
    transition-timing-function: ease-out;
  }
  .header {
    border-radius: var(--radius);
    box-shadow: 0px 13px 0px var(--app-bg-color);
    height: 35px;
  }
  .footer {
    border-radius: var(--radius);
    box-shadow: 0px -13px 0px var(--app-bg-color);
    height: 35px;
  }
  .toast {
    background-color: var(--app-bg-color);
    color: var(--app-text-color);
    font-weight: 600;
    padding: 5px;
    display: flex;
    align-items: center;
    z-index: 1;
  }
  .toast.warning {
    color: var(--warning-color);
  }
  .toast.error {
    color: var(--error-color);
  }
  .toast.success {
    color: var(--success-color);
  }
  .icon {
    margin-right: 5px;
  }
</style>
