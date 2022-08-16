<script lang="ts">
  export let columns = 3;
</script>

<div class="root" style={`grid-template-columns: repeat(${columns}, 1fr)`}>
  <slot />
</div>

<style>
  .root {
    display: grid;
    grid-auto-rows: max-content;
  }
</style>
