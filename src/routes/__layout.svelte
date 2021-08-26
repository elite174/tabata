<script>
  import GlobalStyles from '$components/GlobalStyles.svelte';
  import ServiceWorker from '$components/ServiceWorker.svelte';
  import StoreProvider from '$components/StoreProvider.svelte';
</script>

<StoreProvider>
  <GlobalStyles />
  <div class="layout">
    <ServiceWorker class="Banner" />
    <slot />
  </div>
</StoreProvider>

<style lang="scss">
  @use 'styles/lib' as *;
  .layout {
    position: relative;

    display: grid;
    grid-template-rows: 1fr auto;
    align-items: start;
    height: 100vh;

    :global(.Banner) {
      position: absolute;
      bottom: px(4);
      left: px(4);
      right: px(4);

      z-index: 1;
    }
  }
</style>
