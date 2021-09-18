<script lang="ts">
  export let clickable = true;
</script>

<div class="SettingsRow" on:click class:clickable={clickable}>
  <slot />
</div>

<style lang="scss">
  @use 'styles/lib' as *;

  .SettingsRow {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: px(40);
  }

  .clickable {
    cursor: pointer;
  }
</style>
