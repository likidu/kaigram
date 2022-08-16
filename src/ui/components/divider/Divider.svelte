<script lang="ts">
  import { Color } from '../../enums';
  import { settings } from '../../stores';

  export let title: string = null;
  export let color: Color = Color.Accent;
  export let helpText: string = undefined;
</script>

<div class="root">
  <div class="row">
    {#if title}
      <div class="title" style={`color: ${color};`}>{title}</div>
    {/if}
    <div class="divider" style={`background-color: ${color};`} />
  </div>
  {#if $settings.showHelpText && helpText}
    <div class="info">{helpText}</div>
  {/if}
</div>

<style>
  .root {
    padding: 10px 7px 10px 7px;
  }
  .row {
    display: flex;
    align-items: center;
  }
  .title {
    font-weight: var(--bold-font-weight);
    font-size: 1.2rem;
    color: var(--accent-color);
    text-transform: uppercase;
    padding-right: 7px;
  }
  .divider {
    background-color: var(--accent-color);
    height: 1px;
    flex: 1;
  }
  .info {
    margin-top: 5px;
    margin-bottom: -5px;
  }
</style>
