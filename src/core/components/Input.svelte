<script lang="ts">
  import Icon from './Icon.svelte';

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
  $: canInc = value + changeValue < maxValue;
</script>

<div class="container">
  <div class="name">{name}</div>
  <div class="row">
    <button class="button" disabled={!canDec} on:click={handleDec}>
      <Icon name="remove-outline" size={32} />
    </button>
    <span class="text">{formattedValue}</span>
    <button class="button" disabled={!canInc} on:click={handleInc}>
      <Icon name="add-outline" size={32} />
    </button>
  </div>
</div>

<style lang="scss">
  @use 'styles/lib' as *;

  .container {
    width: 100%;
    max-width: px(300);

    padding-bottom: px(12);
  }

  .name {
    @include regular(16);

    margin-bottom: px(8);
    text-align: center;
    color: var(--color-text-secondary);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .text {
    @include bold(40);
    font-weight: 600;

    margin: 0 px(12);
  }

  .button {
    --border-color: var(--color-accent);
    --icon-color: var(--color-accent);

    display: grid;
    place-items: center;

    flex-shrink: 0;

    width: px(32);
    height: px(32);

    &[disabled] {
      --icon-color: var(--color-text-secondary);
      --border-color: var(--color-disabled);
    }
  }
</style>
