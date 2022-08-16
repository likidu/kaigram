<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import NavGroup from '../nav/NavGroup.svelte';
  import Modal from '../popups/Modal.svelte';
  import FormRow from './FormRow.svelte';
  import NumericRangeRow from './NumericRangeRow.svelte';

  type Color = {
    h: number;
    s: number;
    l: number;
  };

  export let label: string = undefined;
  export let value: Color = undefined;
  export let disabled = false;
  export let onChange: (val: Color) => void;

  let color = { ...value };
  $: color = { ...value };

  const itemId = uuidv4();
  let open = false;

  function reset() {
    open = false;
    color = { ...value };
  }
</script>

<FormRow
  {label}
  {disabled}
  navi={{
    itemId,
    onSelect: () => (open = true),
  }}
  ><div
    class="swatch"
    style={`background-color: hsl(${value.h}, ${value.s}%, ${value.l}%`}
  /></FormRow
>

<Modal
  {open}
  title={label}
  actions={{
    center: {
      label: 'Save',
      actionFn: () => {
        onChange(color);
        reset();
      },
    },
    right: { label: 'Cancel', actionFn: () => reset() },
  }}
  onClose={() => (open = false)}
>
  <div class="preview" style={`background-color: hsl(${color.h}, ${color.s}%, ${color.l}%`} />
  <NavGroup groupId="colorPicker">
    <NumericRangeRow
      label="Hue"
      value={color.h}
      min={0}
      max={360}
      onChange={(val) => (color.h = val)}
    />
    <NumericRangeRow
      label="Saturation"
      value={color.s}
      valueLabel="%"
      min={0}
      max={100}
      onChange={(val) => (color.s = val)}
    />
    <NumericRangeRow
      label="Lightness"
      value={color.l}
      valueLabel="%"
      min={0}
      max={100}
      onChange={(val) => (color.l = val)}
    />
  </NavGroup>
</Modal>

<style>
  .swatch {
    height: 24px;
    width: 24px;
    border-radius: 5px;
    border: 1px solid var(--divider-color);
  }

  .preview {
    height: 24px;
    margin: 0 5px 5px 5px;
    border-radius: calc(var(--radius) / 2);
    border: 1px solid var(--divider-color);
  }
</style>
