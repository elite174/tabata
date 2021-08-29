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
  import { Stage } from '$constants';
  import { formatTime } from '$utils';
  import { lockScreen } from '$utils/wake-lock';

  const { currentTrainingConfig } = getContext<Store>('store');

  let isPlaying = false;
  let trainingPipeline: StageConfig[] = [];
  let remainingTime = 0;
  let totalRemainingTime = 0;
  let currentStageIndex = 0;

  let ready = false;
  let timer: NodeJS.Timer;
  let nextStage: Stage = Stage.END;

  let releaseWakeLockFunction: VoidFunction | null = null;

  const setReleaseWakeLockFunction = (f: VoidFunction | null) => {
    releaseWakeLockFunction = f;
  };

  const clearWakeLock = () => {
    releaseWakeLockFunction?.();
  };

  const setInitialValue = () => {
    const { totalTrainingTime, pipeline } = makeTraining($currentTrainingConfig!);

    trainingPipeline = pipeline;
    totalRemainingTime = totalTrainingTime;
    remainingTime = pipeline[currentStageIndex].duration;
    ready = true;
  };

  setInitialValue();

  const finishTimer = () => {
    isPlaying = false;

    vibrate([200, 200]);
  };

  const tick = () => {
    remainingTime -= 1;
    totalRemainingTime -= 1;

    if (remainingTime < 0) {
      currentStageIndex += 1;
      remainingTime = trainingPipeline[currentStageIndex].duration - 1;

      if (currentStageIndex + 1 < trainingPipeline.length) {
        vibrate([100]);
      }
    }

    if (trainingPipeline[currentStageIndex].stage !== Stage.END) {
      timer = setTimeout(tick, 1000);
    } else {
      finishTimer();
    }
  };

  const handlePlayButtonClick = () => {
    isPlaying = !isPlaying;
  };

  const handleStopButtonClick = () => {
    isPlaying = false;

    setInitialValue();
  };

  const clearTimer = () => clearTimeout(timer);

  const handleBackButtonClick = () => {
    goto('/');
  };

  const cleanUp = () => {
    clearTimer();
    clearWakeLock();
  };

  onMount(() => {
    return cleanUp;
  });

  $: if (isPlaying) {
    tick();
    lockScreen().then(setReleaseWakeLockFunction).catch(clearWakeLock);
  } else {
    cleanUp();
  }

  $: iconName = isPlaying ? 'pause-outline' : 'play-outline';
  $: stageText = i18n.stages[trainingPipeline[currentStageIndex].stage];
  $: nextStage = trainingPipeline[currentStageIndex + 1].stage;
  $: nextStageText = i18n.stages[nextStage] || '-';
</script>

<Page {ready}>
  <div class="container">
    <Header text="Timer" onBackButtonClick={handleBackButtonClick} />
    <div class="timer-container">
      <Timer time={remainingTime} stage={stageText} />
      <div class="info">
        <InfoBlock mainText={nextStageText} secondaryText="Next stage" />
        <InfoBlock mainText={formatTime(totalRemainingTime)} secondaryText="Remaining time" />
      </div>
    </div>
    <div class="buttons">
      <CircleButton name="stop-outline" on:click={handleStopButtonClick} disabled={!isPlaying} />
      <CircleButton name={iconName} on:click={handlePlayButtonClick} />
    </div>
  </div>
</Page>

<style lang="scss">
  @use 'styles/lib' as *;
  .container {
    display: grid;
    grid-template-rows: auto 4fr 1fr;

    align-items: center;

    height: 100%;
  }

  .timer-container {
    display: flex;
    flex-direction: column;
    gap: px(60);
  }

  .info {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-items: center;
    gap: px(24);

    justify-content: center;
  }

  .buttons {
    display: grid;
    grid-template-columns: auto auto;
    gap: px(60);
    justify-content: center;
  }
</style>
