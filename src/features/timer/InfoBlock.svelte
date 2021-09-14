<script>
  export let mainText = '';
  export let secondaryText = '';
</script>

<div class="InfoBlock">
  <div class="InfoBlock-Main">{mainText}</div>
  <div class="InfoBlock-Secondary">{secondaryText}</div>
</div>

<style lang="scss">
  @use 'styles/lib' as *;

  .InfoBlock {
    text-align: center;

    &-Main {
      @include bold(32);
      
      margin-bottom: px(4);
    }

    &-Secondary {
      @include regular(12);
      text-transform: uppercase;

      color: var(--color-text-secondary);
    }
  }
</style>
