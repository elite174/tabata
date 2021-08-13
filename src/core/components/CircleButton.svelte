<script lang="ts">
  import cn from 'classnames';
  import Icon from './Icon.svelte';

  export let name: string;
  export let correctLeft = false;
</script>

<button class={cn($$props.class, 'circleButton')} class:correctLeft on:click>
  <Icon {name} size={30} class="icon" />
</button>

<style lang="scss">
  @use 'styles/lib' as *;

  .circleButton {
    --icon-color: var(--color-neutral);

    display: grid;
    place-items: center;
    width: px(60);
    height: px(60);

    border-radius: 50%;

    background-color: var(--color-accent);

    &.correctLeft :global(.icon) {
      position: relative;
      left: px(2);
    }
  }
</style>
