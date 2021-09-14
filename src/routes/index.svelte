<script lang="ts">
  import { goto } from '$app/navigation';

  import Button from '$components/Button.svelte';
  import Header from '$components/Header.svelte';
  import Page from '$components/Page.svelte';

  import TimerForm from '$features/timer-form/TimerForm.svelte';
  import type { Store } from '$store';
  import type { TrainingData } from 'src/core/typings';
  import { getContext } from 'svelte';

  const { currentTrainingConfig } = getContext<Store>('store');

  let training: TrainingData = {
    beforeTraining: 5,
    afterTraining: 10,
    cycleCount: 1,
    restBetweenCycles: 30,
    restBetweenSets: 10,
    setDuration: 30,
    setsCount: 8
  };

  const handleChange = (value: number, prop: keyof TrainingData) => {
    training[prop] = value;
  };

  const handleStartClick = () => {
    currentTrainingConfig.set(training);
    goto('/timer');
  };
</script>

<Page>
  <div class="page">
    <Header text="Training Setup" />
    <TimerForm {training} onParamChange={handleChange} class="timeform" />
    <div class="buttons">
      <Button on:click={handleStartClick}>Start</Button>
    </div>
  </div>
</Page>

<style lang="scss">
  @use 'styles/lib' as *;

  .page {
    display: grid;
    grid-template-rows: auto 1fr auto;

    height: 100%;

    :global(.timeform) {
      height: 100%;
    }
  }

  .buttons {
    display: grid;
    grid-template-columns: minmax(0, px(330));
    justify-content: center;
    padding: px(12);
  }
</style>
