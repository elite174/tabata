<script>
  import Icon from './Icon.svelte';

  export let text;
  export let onBackButtonClick = undefined;
</script>

<div class="Header">
  <div>
    {#if onBackButtonClick}
      <button on:click={onBackButtonClick}>
        <Icon size={24} name="arrow-back-outline" />
      </button>
    {/if}
  </div>
  <div class="Header-Text">{text}</div>
</div>

<style lang="scss">
  @use 'styles/lib' as *;

  .Header {
    display: grid;
    grid-template-columns: px(60) 1fr px(60);
    place-items: center;

    height: px(60);

    &-Text {
      @include regular(28);
    }
  }
</style>
