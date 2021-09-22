<script lang="ts">
  export let on: boolean = false;
</script>

<button role="switch" aria-checked={on} class="container" class:on on:click>
  <div class="Switcher-Knob" />
</button>

<style lang="scss">
  @use 'styles/lib' as *;

  $padding: px(2);

  .container {
    @include withTransition(
      $properties: (
        background-color
      )
    );

    width: px(36);
    height: px(20);
    padding: $padding;
    background-color: var(--color-hover);
    border-radius: px(10);
    cursor: pointer;

    &.on {
      background-color: var(--color-accent);

      .Switcher-Knob {
        transform: translateX(100%);
      }
    }
  }

  .Switcher-Knob {
    @include withTransition(
      $properties: (
        transform
      )
    );

    width: px(16);
    height: px(16);

    background-color: var(--color-background);
    border-radius: 50%;

    transform: translateX(0);
  }
</style>
