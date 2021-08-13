<script>
  import Icon from '$components/Icon.svelte';

  export let name;
  export let href;
</script>

<a {href} class="navigationButton">
  <Icon {name} size={24} />
</a>

<style lang="scss">
  @use 'styles/lib' as lib;

  .navigationButton {
    @include lib.withTransition($properties: background-color);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    color: inherit;
    text-decoration: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
</style>
