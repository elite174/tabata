<script lang="ts">
  import cn from 'classnames';

  type Kind = 'primary' | 'secondary';

  export let accent = false;
  export let kind: Kind = 'primary';
  export let disabled = false;
  export let error = false;
  export let fullWidth = true;
</script>

<button
  class={cn($$props.class, 'button')}
  on:click
  class:accent
  class:secondary={kind === 'secondary'}
  class:error
  class:fullWidth
  {disabled}
>
  <slot />
</button>

<style lang="scss">
  @use 'styles/lib' as *;

  .button {
    @include regular(16);

    --button-color: var(--color-accent);
    --button-text-color: var(--color-neutral);

    height: px(40);

    background-color: var(--button-color);
    color: var(--button-text-color);
    border-radius: px(40);
  }

  .secondary {
    --button-background-color: var(--color-neutral);

    background-color: var(--color-neutral);
    border: px(2) solid var(--button-color);
    box-sizing: border-box;
    color: var(--button-color);
  }

  .error {
    --button-color: var(--color-error);
  }

  .accent {
    --button-color: var(--color-accent);
  }

  .fullWidth {
    display: block;
    width: 100%;
  }
</style>
