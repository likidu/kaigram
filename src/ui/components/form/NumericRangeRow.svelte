<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import FormRow from './FormRow.svelte';
  import NumericRange from './NumericRange.svelte';

  export let label: string = undefined;
  export let valueLabel: string = undefined;
  export let value: number = undefined;
  export let min: number;
  export let max: number;
  export let disabled = false;
  export let onChange: (val: number) => void;

  const itemId = uuidv4();
  let focused = false;
</script>

<FormRow
  {label}
  {disabled}
  navi={{
    itemId,
    onFocus: () => (focused = true),
    onBlur: () => (focused = false),
  }}
>
  <NumericRange {value} {valueLabel} {min} {max} {onChange} disabled={disabled || !focused} />
</FormRow>
