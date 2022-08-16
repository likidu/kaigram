<script lang="ts">
  import type { Navigation } from '../../models';
  import NavItem from '../nav/NavItem.svelte';

  export let navi: Navigation;
</script>

<NavItem {navi}>
  <slot />
</NavItem>
