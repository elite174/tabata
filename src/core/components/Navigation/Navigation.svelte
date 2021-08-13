<script>
  import NavigationButton from './NavigationButton.svelte';
</script>

<nav class="menu">
  <NavigationButton href="/trainings" name="list" />
  <NavigationButton href="/go" name="settings" />
</nav>

<style lang="scss">
  .menu {
    display: flex;
    align-items: center;
    height: 60px;
  }
</style>
