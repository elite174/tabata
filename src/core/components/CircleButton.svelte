<script lang="ts">
  import cn from 'classnames';
  import Icon from './Icon.svelte';

  export let name: string;
  export let correctLeft = false;
  export let disabled = false;
</script>

<button class={cn($$props.class, 'circleButton')} class:correctLeft {disabled} on:click>
  <Icon {name} size={30} />
</button>

<style lang="scss">
  @use 'styles/lib' as *;

  .circleButton {
    @include withTransition(
      $properties: (
        background-color,
        color
      )
    );

    color: var(--color-accent);

    display: grid;
    place-items: center;
    width: px(60);
    height: px(60);

    border-radius: 50%;
    box-shadow: 0 6px 40px rgba(0, 0, 0, 0.07);

    &.correctLeft {
      padding-left: px(4);
    }

    &:disabled {
      color: var(--color-disabled);
    }

    &:hover {
      background-color: var(--color-hover);

      &:disabled {
        background-color: transparent;
      }
    }

    &:active {
      background-color: var(--color-active);
    }
  }
</style>
