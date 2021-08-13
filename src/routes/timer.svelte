<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { goto } from '$app/navigation';

  import Page from '$components/Page.svelte';
  import Timer from '$features/timer/Timer.svelte';
  import type { Store } from '$store';
  import { getNextState } from '$utils/training';
  import type { TimerGenerator } from '$utils/training';
  import { getContext, onMount } from 'svelte';
  import CircleButton from '$components/CircleButton.svelte';
  import { Ref } from '$utils';

  const { currentTrainingConfig } = getContext<Store>('store');

  const hasConfig = $currentTrainingConfig !== null;

  let isPlaying = false;
  const generatorInstanceRef = new Ref<TimerGenerator | null>(null);

  let time = 0;
  let currentStage = '';
  let ready = false;
  const timerRef = new Ref<NodeJS.Timer>(undefined);
  const setTimer = (value) => (timerRef.current = value);

  if (!hasConfig) {
    goto('/setup');
  } else {
    generatorInstanceRef.current = getNextState($currentTrainingConfig);

    const { value } = generatorInstanceRef.current.next();

    time = value.timeRemained;
    currentStage = value.stage;
    ready = true;
  }

  const tick = () => {
    const {
      value: { stage, timeRemained }
    } = generatorInstanceRef.current.next();

    time = timeRemained;
    currentStage = stage;

    console.log('set');
    timerRef.current = setTimeout(tick, 1000);
  };

  const clearTimer = () => clearTimeout(timerRef.current);

  $: if (isPlaying) {
    tick();
  } else {
    clearTimer();
  }
</script>

<Page {ready}>
  <div class="container">
    <Timer {time} stage={currentStage} />
    <div />
    <div class="buttons">
      <CircleButton name="stop-outline" />
      <CircleButton
        name={isPlaying ? 'pause-outline' : 'play-outline'}
        correctLeft
        on:click={() => {
          isPlaying = !isPlaying;
        }}
      />
    </div>
  </div>
</Page>

<style lang="scss">
  @use 'styles/lib' as *;
  .container {
    display: grid;
    grid-template-rows: 4fr 1fr 1fr;

    align-items: center;
    justify-items: center;

    height: 100%;
  }

  .buttons {
    display: grid;
    grid-template-columns: auto auto;
    gap: px(24);
  }
</style>
