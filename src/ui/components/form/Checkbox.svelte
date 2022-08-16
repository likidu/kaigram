<script lang="ts">
  import MdCheck from 'svelte-icons/md/MdCheck.svelte';
  import { Color } from '../../enums';
  import Icon from '../icon/Icon.svelte';

  export let checked: boolean;
</script>

<div class="root">
  {#if checked}
    <Icon color={Color.Accent}><MdCheck /></Icon>
  {:else}
    <Icon color={Color.Tertiary}><MdCheck /></Icon>
  {/if}
</div>

<style>
</style>
