<script lang="ts">
  import cn from 'classnames';

  import Input from '$components/Input.svelte';
  import ScrollContainer from '$components/ScrollContainer.svelte';
  import type { TrainingData } from 'src/core/typings';

  export let training: TrainingData;
  export let onParamChange: (value: number, prop: keyof TrainingData) => void;
</script>

<ScrollContainer vertical class={cn($$props.class, 'timeformContainer')}>
  <Input
    name="Time before training"
    value={training.beforeTraining}
    changeValue={5}
    maxValue={120}
    units="sec"
    onChange={(value) => onParamChange(value, 'beforeTraining')}
  />
  <Input
    name="Set duration"
    value={training.setDuration}
    changeValue={5}
    maxValue={120}
    units="sec"
    onChange={(value) => onParamChange(value, 'setDuration')}
  />
  <Input
    name="Sets count"
    value={training.setsCount}
    changeValue={1}
    maxValue={20}
    units="sets"
    onChange={(value) => onParamChange(value, 'setsCount')}
  />
  <Input
    name="Rest between sets"
    value={training.restBetweenSets}
    changeValue={5}
    maxValue={120}
    units="sec"
    onChange={(value) => onParamChange(value, 'restBetweenSets')}
  />
  <Input
    name="Cycles count"
    value={training.cycleCount}
    changeValue={1}
    maxValue={20}
    units="cycles"
    onChange={(value) => onParamChange(value, 'cycleCount')}
  />
  <Input
    name="Rest between cycles"
    value={training.restBetweenCycles}
    changeValue={5}
    maxValue={120}
    units="sec"
    onChange={(value) => onParamChange(value, 'restBetweenCycles')}
  />
  <Input
    name="Time after training"
    value={training.afterTraining}
    changeValue={5}
    maxValue={120}
    units="sec"
    onChange={(value) => onParamChange(value, 'afterTraining')}
  />
</ScrollContainer>

<style lang="scss">
  @use 'styles/lib' as *;

  :global(.timeformContainer) {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: auto;
    align-items: start;
    justify-items: center;
    gap: px(12);

    padding: 0 px(24);
  }
</style>
