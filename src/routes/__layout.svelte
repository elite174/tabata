<script>
  import GlobalStyles from '$components/GlobalStyles.svelte';
  import StoreProvider from '$components/StoreProvider.svelte';
</script>

<StoreProvider>
  <div class="layout">
    <GlobalStyles />
    <slot />
  </div>
</StoreProvider>

<style lang="scss">
  .layout {
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: start;
    height: 100vh;
  }
</style>
