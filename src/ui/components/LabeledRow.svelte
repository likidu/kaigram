<script lang="ts">
  import Typography from './Typography.svelte';

  export let label: string;
</script>

<div class="root">
  <Typography type="caption" padding="none">{label}</Typography>
  <slot />
</div>

<style>
  .root {
    padding: 7px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--divider-color);
  }
</style>
