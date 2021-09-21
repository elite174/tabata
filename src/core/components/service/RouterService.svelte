<script lang="ts">
  import { setContext } from 'svelte';

  import { ContextKeys } from '$constants';
  import { routerStore } from '$store/routerStore';

  export let currentPath = '';

  setContext(ContextKeys.RouterStore, routerStore);

  $: routerStore.set({ currentPath });
</script>

<slot />
