<script lang="ts">
  export let groupId: string;
  export let style = '';
  export let flex = true;
</script>

<div class="root" class:flex {style} data-onyx-group-id={groupId}>
  <div class="scroller" data-onyx-scroller>
    <slot />
  </div>
</div>

<style>
  .root {
    height: 100%;
  }
  .flex {
    flex: 1;
    min-height: 0;
  }
  .scroller {
    height: 100%;
    overflow-y: auto;
  }
</style>
