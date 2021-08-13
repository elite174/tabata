<script>
  import cn from 'classnames';

  export let vertical = true;
  export let horizontal = false;
</script>

<div class={cn($$props.class, 'scrollContainer')} class:vertical class:horizontal>
  <slot />
</div>

<style lang="scss">
  .scrollContainer {
    overflow: hidden;

    &.vertical {
      overflow-y: auto;
    }

    &.horizontal {
      overflow-x: auto;
    }
  }
</style>
