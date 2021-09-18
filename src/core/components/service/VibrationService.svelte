<script context="module" lang="ts">
  type VibrateFunction = (config: number[]) => void;

  export type VibrateService = {
    vibrate: VibrateFunction;
  };
</script>

<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { get } from 'svelte/store';
  import type {Writable} from 'svelte/store';

  import { ContextKeys } from '$constants';
  import type { SettingsStore } from '$store/settingsStore';

  const settingsStore = getContext<Writable<SettingsStore>>(ContextKeys.SettingsStore);

  const vibrate = (config: number[]) => {
    if (!get(settingsStore).sounds.vibration) return;

    if (navigator?.vibrate) {
      navigator.vibrate(config);
    }
  };

  setContext<VibrateService>(ContextKeys.VibrateService, { vibrate });
</script>

<slot />
