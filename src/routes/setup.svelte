<script lang="ts">
  import { goto } from '$app/navigation';

  import Button from '$components/Button.svelte';
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
    <div class="header">Training Setup</div>
    <TimerForm {training} onParamChange={handleChange} class="timeform" />
    <div class="buttons">
      <Button kind="secondary" error>Cancel</Button>
      <Button onClick={handleStartClick}>Start</Button>
    </div>
  </div>
</Page>

<style lang="scss">
  @use 'styles/lib' as *;

  .page {
    display: grid;
    grid-template-rows: auto 1fr auto;

    height: 100%;
  }

  :global(.timeform) {
    height: 100%;
  }

  .header {
    display: grid;
    place-items: center;

    height: px(40);
    margin-bottom: px(12);

    border-bottom: px(1) solid var(--color-accent);

    @include bold(24);
  }

  .buttons {
    display: grid;
    grid-template-rows: repeat(2, auto);
    gap: px(8);
    padding: px(12);
  }
</style>
