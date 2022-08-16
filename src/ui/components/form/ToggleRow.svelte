<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import FormRow from './FormRow.svelte';
  import Toggle from './Toggle.svelte';

  export let label: string;
  export let value: boolean;
  export let disabled = false;
  export let onChange: (val: boolean) => void;

  const itemId = uuidv4();
</script>

<FormRow {label} {disabled} navi={{ itemId, onSelect: () => !disabled && onChange(!value) }}>
  <Toggle {value} />
</FormRow>

<style>
</style>
