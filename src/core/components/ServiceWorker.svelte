<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Workbox } from 'workbox-window';
  import cn from 'classnames';
  import Button from './Button.svelte';

  let needUpdate = false;

  const handleButtonClick = () => {
    window.location.reload();
  };

  onMount(() => {
    if (import.meta.env.DEV) return;

    const wb = new Workbox('/sw.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        needUpdate = true;
      }
    });

    wb.register();

    navigator.serviceWorker.addEventListener('message', async (event) => {
      // Optional: ensure the message came from workbox-broadcast-update
      if (event.data.meta === 'workbox-broadcast-update') {
        const { cacheName, updatedUrl } = event.data.payload;

        needUpdate = true;
      }
    });
  });
</script>

{#if needUpdate}
  <div transition:fly={{ duration: 300, y: 60 }} class={cn('UpdateBanner', $$props.class)}>
    <div class="UpdateBanner-Text">New version of this app is available!</div>
    <Button on:click={handleButtonClick}>Update</Button>
  </div>
{/if}

<style lang="scss">
  @use 'styles/lib' as *;
  .UpdateBanner {
    display: flex;
    flex-direction: column;
    text-align: center;

    padding: px(24);
    gap: px(8);

    background-color: var(--color-neutral);

    &-Text {
      @include regular(20);
    }
  }
</style>
