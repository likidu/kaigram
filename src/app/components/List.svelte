<script lang="ts">
  import { useMeTodoListLists } from '../todo';
  import Debugger from 'svelte-debugger';

  export let token: string;
  const todos = useMeTodoListLists(token);
</script>

<div class="max-h-10">
  {#if $todos.isLoading}
    <span>Loading...</span>
  {:else if $todos.isError}
    <span>Error: {$todos.error}</span>
  {:else}
    <Debugger
      data={$todos.data}
      indent={2}
      colorOptions={{ falseColor: '#ff3e00', trueColor: '#40b3ff' }}
    />
  {/if}
</div>