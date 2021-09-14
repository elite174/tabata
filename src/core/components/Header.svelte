<script lang="ts">
  import Icon from './Icon.svelte';

  export let text: string;
  export let onBackButtonClick: VoidFunction | undefined = undefined;
</script>

<div class="Header">
  {#if onBackButtonClick}
    <button class="Header-Button" on:click={onBackButtonClick}>
      <Icon size={28} name="arrow-back-outline" />
    </button>
  {:else}
    <div />
  {/if}
  <div class="Header-Text">{text}</div>
</div>

<style lang="scss">
  @use 'styles/lib' as *;

  .Header {
    display: grid;
    grid-template-columns: px(60) 1fr px(60);
    place-items: center;

    text-align: center;

    padding: px(10) 0 px(20);

    &-Text {
      @include bold(28);
    }

    &-Button {
      display: block;

      width: 100%;
      height: 100%;

      color: var(--color-accent);
    }
  }
</style>
