<script lang="ts">
  import cn from 'classnames';
  import { formatTime } from '$utils';

  export let time = 0;
  export let stage: string;

  $: formattedTime = formatTime(time);
</script>

<div class={cn('timer', $$props.class)}>
  <div class="time">{formattedTime}</div>
  {#if stage}
    <div class="stage">{stage}</div>
  {/if}
</div>

<style lang="scss">
  @use 'styles/lib' as *;

  .timer {
    text-align: center;
  }

  .time {
    @include bold(90);
  }

  .stage {
    @include regular(36);

    margin-top: px(4);
  }
</style>
