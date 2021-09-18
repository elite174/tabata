<script lang="ts">
  import { onMount, setContext } from 'svelte';

  import { ContextKeys } from '$constants';
  import { settingsStore } from '$store/settingsStore';
  import { runtimeStore } from '$store/runtimeStore';
  import type { SettingsStore } from '$store/settingsStore';
  import { PersistService } from '$services/persist';

  setContext(ContextKeys.SettingsStore, settingsStore);
  setContext(ContextKeys.RuntimeStore, runtimeStore);

  let settingsPersistService: PersistService<SettingsStore>;

  const init = async () => {
    settingsPersistService = new PersistService<SettingsStore>({
      name: ContextKeys.SettingsStore
    });

    const localSettings = await settingsPersistService.getData(ContextKeys.SettingsStore);

    if (localSettings) {
      settingsStore.set(localSettings);
    }
  };

  init();

  onMount(() => {
    const unsubSettingsStore = settingsPersistService.subscribe(
      settingsStore,
      ContextKeys.SettingsStore
    );

    return () => {
      unsubSettingsStore();
    };
  });
</script>

<slot />
