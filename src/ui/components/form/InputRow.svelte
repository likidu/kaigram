<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { focus } from '../../actions/focus';
  import FormRow from './FormRow.svelte';

  export let label: string;
  export let value: string;
  export let placeholder: string = undefined;
  export let disabled = false;
  export let onChange: (val: string) => void;
  export let onSubmit: () => void = undefined;

  const itemId = uuidv4();
  let focused = false;

  function handleChange(ev: Event) {
    onChange((ev.target as HTMLElement).textContent);
  }
</script>

<FormRow
  {label}
  {disabled}
  navi={{
    itemId,
    onFocus: () => (focused = true),
    onBlur: () => (focused = false),
    onSelect: () => onSubmit?.(),
  }}
>
  {#if value?.length === 0 && !focused}
    <div class="placeholder" use:focus={{ focused }}>
      {placeholder}
    </div>
  {:else}
    <div
      class="input"
      role="textbox"
      contenteditable
      use:focus={{ focused }}
      on:input={handleChange}
      on:keydown={(ev) => {
        if (ev.key === 'Enter') ev.preventDefault();
      }}
      on:keyup={(ev) => {
        if (ev.key === 'Enter') ev.preventDefault();
      }}
    >
      {value}
    </div>
  {/if}
</FormRow>

<style>
  .input,
  .placeholder {
    min-height: 24px;
    min-width: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    outline: none;
    padding: 0 2px;
  }
  .placeholder {
    opacity: 0.3;
  }
</style>
