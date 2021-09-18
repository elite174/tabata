<div class="SettingsHeader">
  <slot />
</div>

<style lang="scss">
  @use 'styles/lib' as *;
  .SettingsHeader {
    @include bold(24);

    display: flex;
    align-items: center;

    height: px(40);

    color: var(--color-accent);
  }
</style>
