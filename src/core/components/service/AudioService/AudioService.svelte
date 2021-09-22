<script lang="ts">
  import { get } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import { getContext, setContext } from 'svelte';

  import { ContextKeys } from '$constants';
  import type { SettingsStore } from '$store/settingsStore';

  import { AudioPresetName, commonSounds, controlNames, presets } from './constants';
  import type { Sound, AudioService } from './interfaces';

  let activePresetName: AudioPresetName = AudioPresetName.Heather;

  $: activePreset = { ...presets[activePresetName], ...commonSounds };

  const settingsStore = getContext<Writable<SettingsStore>>(ContextKeys.SettingsStore);

  const controls: Record<Sound, HTMLAudioElement | null> = {
    tick: null,
    rest: null,
    work: null,
    last_one: null,
    training_completed: null
  };

  const playSound = (soundToPlay: Sound) => {
    Object.values(controls).forEach((c) => c?.pause());

    if (!get(settingsStore).sounds.sounds) return;

    const control = controls[soundToPlay];

    if (!control) {
      return;
    }

    control.currentTime = 0;
  };

  setContext<AudioService>(ContextKeys.AudioService, { playSound });
</script>

<slot />

{#each controlNames as name (name)}
  <audio
    bind:this={controls[name]}
    src={activePreset[name]}
    preload="auto"
    style="display: none;"
    on:seeked={controls[name]?.play}
  />
{/each}
