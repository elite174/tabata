<script context="module" lang="ts">
  import { get } from 'svelte/store';
  import { store } from '$store';

  export const ssr = false;

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({}) {
    const hasConfig = get(store.currentTrainingConfig) !== null;

    if (!hasConfig) {
      return {
        status: 308,
        redirect: '/'
      };
    }

    return {
      status: 200
    };
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';

  import Page from '$components/Page.svelte';
  import Timer from '$features/timer/Timer.svelte';
  import type { Store } from '$store';
  import type { StageConfig } from '$utils/training';
  import { makeTraining } from '$utils/training';
  import { getContext, onMount } from 'svelte';
  import CircleButton from '$components/CircleButton.svelte';
  import InfoBlock from '$features/timer/InfoBlock.svelte';
  import Header from '$components/Header.svelte';
  import { i18n } from '$i18n';
  import { vibrate } from '$utils/vibrate';
  import type { Stage } from '$constants';
  import { formatTime } from '$utils';
  import WakeLock from '$components/service/WakeLock.svelte';
  import type { Sound } from '$utils/sound/sound';

  import Audio from '$components/service/Audio.svelte';

  const { currentTrainingConfig } = getContext<Store>('store');

  let trainingTime = 0;
  let isPlaying = false;
  let trainingPipeline: StageConfig[] = [];
  let remainingTime = 0;
  let totalRemainingTime = 0;
  let currentStageIndex = 0;

  let ready = false;
  let timer: NodeJS.Timer;
  let nextStage: Stage | undefined;

  let audioPlayTrigger = 0;
  let activeSound: Sound;

  const playSound = (sound: Sound) => {
    activeSound = sound;
    audioPlayTrigger = Math.random();
  };

  const setInitialValue = () => {
    const { totalTrainingTime, pipeline } = makeTraining($currentTrainingConfig!);

    trainingTime = totalTrainingTime;
    trainingPipeline = pipeline;
    totalRemainingTime = totalTrainingTime;
    remainingTime = pipeline[currentStageIndex].duration;
    ready = true;
  };

  const resetTraining = () => {
    currentStageIndex = 0;
    remainingTime = trainingPipeline[currentStageIndex].duration;
    totalRemainingTime = trainingTime;
  };

  const finishTimer = () => {
    isPlaying = false;

    vibrate([200, 200]);
    playSound('end');
  };

  const tick = () => {
    totalRemainingTime -= 1;
    remainingTime -= 1;

    if (totalRemainingTime === 0 && currentStageIndex + 1 === trainingPipeline.length) {
      finishTimer();

      return;
    }

    if (remainingTime <= 3 && remainingTime > 0) {
      playSound('tick');
    }

    if (remainingTime < 1) {
      currentStageIndex += 1;

      remainingTime = trainingPipeline[currentStageIndex].duration;

      vibrate([100]);
      playSound('stage');
    }

    timer = setTimeout(tick, 1000);
  };

  const handlePlayButtonClick = () => {
    isPlaying = !isPlaying;
  };

  const handleStopButtonClick = () => {
    isPlaying = false;

    resetTraining();
  };

  const clearTimer = () => clearTimeout(timer);

  const handleBackButtonClick = () => {
    goto('/');
  };

  const cleanUp = () => {
    clearTimer();
  };

  setInitialValue();

  onMount(() => {
    return cleanUp;
  });

  $: if (isPlaying) {
    tick();
  } else {
    cleanUp();
  }

  $: iconName = isPlaying ? 'pause-outline' : 'play-outline';
  $: stageText = i18n.stages[trainingPipeline[currentStageIndex].stage];
  $: nextStage = trainingPipeline[currentStageIndex + 1]?.stage;
  $: nextStageText = nextStage ? i18n.stages[nextStage] : '-';
</script>

<Page {ready}>
  <Audio playTrigger={audioPlayTrigger} {activeSound} />
  <WakeLock lock />
  <div class="Timer">
    <Header text="Timer" onBackButtonClick={handleBackButtonClick} />
    <div class="Timer-Container">
      <Timer time={remainingTime} stage={stageText} />
      <div class="Timer-Info">
        <InfoBlock mainText={nextStageText} secondaryText="Next stage" />
        <InfoBlock mainText={formatTime(totalRemainingTime)} secondaryText="Remaining time" />
      </div>
    </div>
    <div class="Timer-Buttons">
      <CircleButton name="stop-outline" on:click={handleStopButtonClick} disabled={isPlaying} />
      <CircleButton
        name={iconName}
        on:click={handlePlayButtonClick}
        correctLeft={iconName === 'play-outline'}
      />
    </div>
  </div>
</Page>

<style lang="scss">
  @use 'styles/lib' as *;
  .Timer {
    display: grid;
    grid-template-rows: auto 4fr 1fr;

    align-items: center;

    height: 100%;
  }

  .Timer-Container {
    display: flex;
    flex-direction: column;
    gap: px(80);
  }

  .Timer-Info {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-items: center;
    justify-content: center;
    gap: px(40);
  }

  .Timer-Buttons {
    display: grid;
    grid-template-columns: auto auto;
    gap: px(60);
    justify-content: center;
  }
</style>
