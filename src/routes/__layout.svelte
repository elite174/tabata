<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page }) {
    return {
      props: {
        currentPath: page.path
      }
    };
  }
</script>

<script>
  import Navigation from '$components/Navigation/Navigation.svelte';
  import AudioService from '$components/service/AudioService/AudioService.svelte';
  import GlobalStyles from '$components/service/GlobalStyles.svelte';
  import RouterService from '$components/service/RouterService.svelte';
  import ServiceWorker from '$components/service/ServiceWorker.svelte';
  import StoreProvider from '$components/service/StoreProvider.svelte';
  import VibrationService from '$components/service/VibrationService.svelte';
  import WakeLockService from '$components/service/WakeLockService/WakeLockService.svelte';

  export let currentPath = '';
</script>

<StoreProvider>
  <AudioService>
    <WakeLockService>
      <RouterService {currentPath}>
        <VibrationService>
          <GlobalStyles />
          <div class="layout">
            <ServiceWorker class="Banner" />
            <slot />
            <slot name="navigation">
              <Navigation />
            </slot>
          </div>
        </VibrationService>
      </RouterService>
    </WakeLockService>
  </AudioService>
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
      bottom: 0;
      left: 0;
      right: 0;

      z-index: 1;
    }
  }
</style>
