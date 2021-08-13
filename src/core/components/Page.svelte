<script>
  import cn from 'classnames';

  export let ready = true;
</script>

<div class={cn($$props.class, 'page')}>
  {#if ready}
    <slot>page</slot>
  {/if}
</div>

<style>
  .page {
    height: 100%;
    overflow: hidden;
  }
</style>
