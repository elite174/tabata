<script>
  import { onMount } from 'svelte';

  let newWorker = null;
  let showButton = false;
  let refreshing = false;

  onMount(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register()

    // Register the service worker
    navigator.serviceWorker.register('/app-update-sw.js').then((registration) => {
      registration.addEventListener('updatefound', () => {
        // An updated service worker has appeared in reg.installing!
        newWorker = registration.installing;

        newWorker.addEventListener('statechange', () => {
          // Has service worker state changed?
          switch (newWorker.state) {
            case 'installed':
              // There is a new service worker available, show the notification
              if (navigator.serviceWorker.controller) {
                showButton = true;
              }

              break;
          }
        });
      });
    });
  });

  const handleClick = () => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  };
</script>

<button on:click={handleClick}> Update </button>
