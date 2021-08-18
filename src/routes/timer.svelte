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
  import { getNextState } from '$utils/training';
  import type { TimerGenerator } from '$utils/training';
  import { getContext, onMount } from 'svelte';
  import CircleButton from '$components/CircleButton.svelte';
  import InfoBlock from '$features/timer/InfoBlock.svelte';
  import Header from '$components/Header.svelte';
  import { Stage } from '$constants';
  import { i18n } from 'src/i18n';

  const { currentTrainingConfig } = getContext<Store>('store');

  let isPlaying = false;
  let generatorInstance: TimerGenerator;

  let time = 0;
  let currentStage;
  let ready = false;
  let timer: NodeJS.Timer;

  const setInitialValue = () => {
    generatorInstance = getNextState($currentTrainingConfig);
    const { value } = generatorInstance.next();

    time = value.timeRemained;
    currentStage = i18n.stages[value.stage];
    ready = true;
  };

  setInitialValue();

  const tick = () => {
    const {
      value: { stage, timeRemained }
    } = generatorInstance.next();

    time = timeRemained;
    currentStage = i18n.stages[stage];

    timer = setTimeout(tick, 1000);
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

  onMount(() => {
    return () => {
      clearTimer();
    };
  });

  $: if (isPlaying) {
    tick();
  } else {
    clearTimer();
  }

  $: iconName = isPlaying ? 'pause-outline' : 'play-outline';
</script>

<Page {ready}>
  <div class="container">
    <Header text="Timer" onBackButtonClick={handleBackButtonClick} />
    <div class="timer-container">
      <Timer {time} stage={currentStage} />
      <div class="info">
        <InfoBlock mainText="Rest" secondaryText="Next stage" />
        <InfoBlock mainText="00:30" secondaryText="Remaining time" />
      </div>
    </div>
    <div class="buttons">
      <CircleButton name="stop-outline" on:click={handleStopButtonClick} />
      <CircleButton
        name={iconName}
        correctLeft={iconName === 'play-outline'}
        on:click={handlePlayButtonClick}
      />
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
    gap: px(40);
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
