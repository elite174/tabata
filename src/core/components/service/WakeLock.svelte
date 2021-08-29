<script lang="ts">
  import { onMount } from 'svelte';

  import { lockScreen } from '$utils/wake-lock';

  export let lock = false;

  let releaseWakeLockFunction: VoidFunction | null = null;

  const setReleaseWakeLockFunction = (f: VoidFunction | null) => {
    releaseWakeLockFunction = f;
  };

  const clearWakeLock = () => {
    releaseWakeLockFunction?.();
  };

  onMount(() => {
    return clearWakeLock;
  });

  $: if (lock) {
    lockScreen().then(setReleaseWakeLockFunction).catch(clearWakeLock);
  } else {
    clearWakeLock();
  }
</script>
