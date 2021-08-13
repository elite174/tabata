<script>
  import { setContext } from 'svelte';

  import { store } from '../store';

  setContext('store', store);
</script>

<slot />
