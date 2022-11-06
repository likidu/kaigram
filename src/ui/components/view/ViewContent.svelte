<script lang="ts">
  import NavGroup from '../nav/NavGroup.svelte';
</script>

<div class="root">
  <NavGroup groupId="view">
    <slot />
  </NavGroup>
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;
  }
</style>
