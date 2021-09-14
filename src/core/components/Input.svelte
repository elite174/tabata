<script lang="ts">
  import CircleButton from './CircleButton.svelte';

  type InputType = 'number' | 'time';

  export let name: string = 'Name';
  export let type: InputType = 'number';
  export let value = 0;
  export let changeValue = 1;
  export let maxValue = 3600;
  export let minValue = 0;
  export let units: string = '';
  export let onChange: (value: number) => void;

  const handleInc = () => {
    if (value + changeValue < minValue) {
      return;
    }

    onChange(value + changeValue);
  };

  const handleDec = () => {
    if (value - changeValue < minValue) {
      return;
    }

    onChange(value - changeValue);
  };

  $: formattedValue =
    type === 'number'
      ? `${value} ${units}`
      : `${Math.floor(value / 60)
          .toString()
          .padStart(2, '0')}:${(value % 60).toString().padStart(2, '0')} ${units}`;

  $: canDec = value - changeValue >= minValue;
  $: canInc = value + changeValue <= maxValue;
</script>

<div class="Input">
  <div class="Input-Name">{name}</div>
  <div class="row">
    <CircleButton
      class="Input-Button"
      disabled={!canDec}
      name="remove-outline"
      on:click={handleDec}
    />
    <span class="Input-Text">{formattedValue}</span>
    <CircleButton class="Input-Button" disabled={!canInc} name="add-outline" on:click={handleInc} />
  </div>
</div>

<style lang="scss">
  @use 'styles/lib' as *;

  .Input {
    width: 100%;

    padding-bottom: px(12);

    :global(&-Button) {
      flex-shrink: 0;
    }
  }

  .Input-Name {
    @include regular(20);

    margin-bottom: px(4);
    text-align: center;
    color: var(--color-text-secondary);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .Input-Text {
    @include bold(40);
    font-weight: 600;

    text-align: center;

    margin: 0 px(12);
  }
</style>
