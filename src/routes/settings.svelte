<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  import Header from '$components/Header.svelte';
  import Page from '$components/Page.svelte';
  import Switcher from '$components/Switcher.svelte';
  import { ContextKeys } from '$constants';
  import SettingsHeader from '$features/settings/SettingsHeader.svelte';
  import SettingsRow from '$features/settings/SettingsRow.svelte';
  import type { SettingsStore } from '$store/settingsStore';

  const settingsStore = getContext<Writable<SettingsStore>>(ContextKeys.SettingsStore);

  const changeSoundsSettings = (key: keyof SettingsStore['sounds'], value: boolean) => {
    settingsStore.update((settingsStore) => {
      settingsStore.sounds[key] = value;

      return settingsStore;
    });
  };

  $: isSoundOn = $settingsStore.sounds.sounds;
  $: isVibrationOn = $settingsStore.sounds.vibration;
</script>

<Page>
  <Header text="Settings" />
  <div class="Settings">
    <SettingsHeader>Sounds</SettingsHeader>
    <SettingsRow clickable on:click={() => changeSoundsSettings('sounds', !isSoundOn)}>
      <span class="Settings-Text">Sounds</span>
      <Switcher on={isSoundOn} />
    </SettingsRow>
    <SettingsRow clickable on:click={() => changeSoundsSettings('vibration', !isVibrationOn)}>
      <span class="Settings-Text">Vibration</span>
      <Switcher on={isVibrationOn} />
    </SettingsRow>
  </div>
</Page>

<style lang="scss">
  @use 'styles/lib' as *;

  .Settings {
    padding: px(12);

    &-Text {
      @include regular(16);
    }
  }
</style>
