<script>
  import { onMount } from 'svelte';
  import { Workbox } from 'workbox-window';

  onMount(() => {
    const wb = new Workbox('/sw.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        // Show "Update App" banner
        console.log('UPDATE')
      }
    });

    wb.register();

    navigator.serviceWorker.addEventListener('message', async (event) => {
      // Optional: ensure the message came from workbox-broadcast-update
      if (event.data.meta === 'workbox-broadcast-update') {
        const { cacheName, updatedUrl } = event.data.payload;

        console.log(cacheName, updatedUrl)
      }
    });
  });
</script>

<div />
