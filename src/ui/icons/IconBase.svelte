<script lang="ts">
  export let title: string = undefined;
  export let viewBox: string = '0 0 24 24';
</script>

<svg xmlns="http://www.w3.org/2000/svg" {viewBox}>
  {#if title}
    <title>{title}</title>
  {/if}
  <slot />
</svg>

<style>
  svg {
    stroke: currentColor;
    fill: none;
    stroke-width: 0;
    width: 100%;
    height: auto;
    max-height: 100%;
  }
</style>
