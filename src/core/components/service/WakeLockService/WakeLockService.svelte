<script lang="ts">
  import { setContext } from 'svelte';

  import { ContextKeys } from '$constants';

  import { lockScreen } from './utils';

  import type { WakeLockService } from './interfaces';

  let releaseWakeLockFunction: VoidFunction | null;

  const setReleaseWakeLockFunction = (f: VoidFunction | null) => {
    releaseWakeLockFunction = f;
  };

  const requestWakeLock = async () =>
    lockScreen().then(setReleaseWakeLockFunction).catch(clearWakeLock);

  const clearWakeLock = () => {
    releaseWakeLockFunction?.();
  };

  setContext<WakeLockService>(ContextKeys.WakeLockService, {
    requestWakeLock,
    clearWakeLock
  });
</script>

<slot />
