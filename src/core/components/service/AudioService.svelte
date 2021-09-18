<script lang="ts" context="module">
  export type Sound = 'tick' | 'stage' | 'end';
</script>

<script lang="ts">
  import { get } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import defaultTick from '../../utils/sound/assets/default/tick.mp3';
  import defaultStage from '../../utils/sound/assets/default/stage.mp3';
  import defaultEnd from '../../utils/sound/assets/default/end.mp3';
  import { getContext } from 'svelte';
  import { ContextKeys } from '$constants';
  import type { SettingsStore } from '$store/settingsStore';

  export let activeSound: Sound | null = null;
  export let tickSrc: string = defaultTick;
  export let endSrc: string = defaultEnd;
  export let stageSrc: string = defaultStage;
  export let playTrigger: number = 0;

  const settingsStore = getContext<Writable<SettingsStore>>(ContextKeys.SettingsStore);

  const controls: Record<Sound, HTMLAudioElement | null> = {
    tick: null,
    end: null,
    stage: null
  };

  const playSound = (active: Sound) => {
    Object.values(controls).forEach((c) => c?.pause());

    if (!get(settingsStore).sounds.sounds) return;

    const control = controls[active];

    if (!control) {
      return;
    }

    control.currentTime = 0;
    control.addEventListener('seeked', () => control.play(), { once: true });
  };

  const usePlay = (trigger: number) => {
    if (!trigger || !activeSound) return;

    playSound(activeSound);
  };

  $: usePlay(playTrigger);
</script>

<audio bind:this={controls.tick} src={tickSrc} preload="auto" style="display: none;" />
<audio bind:this={controls.end} src={endSrc} preload="auto" style="display: none;" />
<audio bind:this={controls.stage} src={stageSrc} preload="auto" style="display: none;" />
