<script lang="ts">
  import Icon from '$components/Icon.svelte';

  export let name: string;
  export let href: string;
  export let text: string;
  export let active = false;
</script>

<a {href} class="NavigationButton" class:active on:click>
  <Icon {name} size={28} />
  <span class="NavigationButton-Text">{text}</span>
</a>

<style lang="scss">
  @use 'styles/lib' as *;

  .NavigationButton {
    @include withTransition($properties: background-color);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: px(4);

    padding: px(8);
    border-radius: var(--border-radius);

    color: inherit;
    text-decoration: none;

    &:active {
      background-color: var(--color-hover);
    }

    &-Text {
      @include regular(12);

      color: var(--color-text-secondary);
    }

    &.active {
      color: var(--color-accent);

      .NavigationButton-Text {
        color: var(--color-accent);
      }
    }
  }
</style>
