<script lang="ts">
  import { Color } from '../../enums';

  export let height = 7;
  export let color: Color = Color.Accent;
  export let value: number;
</script>

<div class="root" style={`height: ${height}px`}>
  <div class="progress" style={`right: calc(100% - ${value}%); background-color: ${color}`} />
</div>

<style>
  .root {
    position: relative;
    height: 10px;
    margin: 5px 0;
    border-radius: var(--radius);
    overflow: hidden;
    background-color: var(--divider-color);
  }
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: var(--radius);
  }
</style>
