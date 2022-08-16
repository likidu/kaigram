<script lang="ts">
  export let value: boolean;
</script>

<div class="root" class:on={value}>
  <div class="toggle" class:on={value} />
</div>

<style>
  .root {
    height: 20px;
    width: 36px;
    border: 1px solid var(--text-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 4px;
    margin: 2px 0;
  }
  .root.on {
    background-color: var(--accent-color);
  }
  .toggle {
    background-color: var(--text-color);
    border-radius: 50%;
    height: 10px;
    width: 10px;
    transition: transform var(--animation-speed);
    transition-timing-function: ease-in-out;
  }
  .toggle.on {
    background-color: var(--card-color);
    transform: translateX(16px);
  }
</style>
