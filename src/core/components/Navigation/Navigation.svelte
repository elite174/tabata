<script>
  import NavigationButton from './NavigationButton.svelte';
</script>

<nav class="menu">
  <NavigationButton href="/" name="list-outline" />
  <NavigationButton href="/settings" name="settings-outline" />
</nav>

<style lang="scss">
  .menu {
    display: flex;
    align-items: center;
    height: 60px;
  }
</style>
