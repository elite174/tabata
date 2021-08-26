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
    --icon-color: var(--color-accent);

    display: grid;
    place-items: center;
    width: px(60);
    height: px(60);
  }
</style>
