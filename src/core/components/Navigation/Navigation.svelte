<script context="module" lang="ts">
  type Route = {
    href: string;
    iconName: string;
    text: string;
  };

  const routes: Route[] = [
    {
      href: '/',
      iconName: 'stopwatch-outline',
      text: 'Quick training'
    },
    {
      href: '/settings',
      iconName: 'settings-sharp',
      text: 'Settings'
    }
  ];
</script>

<script lang="ts">
  import { browser } from '$app/env';

  import NavigationButton from './NavigationButton.svelte';

  let activeRoute: string = '/';

  if (browser) {
    activeRoute = window.location.pathname;
  }

  const handleClick = (route: string) => () => (activeRoute = route);
</script>

<nav class="menu">
  {#each routes as route (route.href)}
    <NavigationButton
      href={route.href}
      name={route.iconName}
      text={route.text}
      active={activeRoute === route.href}
      on:click={handleClick(route.href)}
    />
  {/each}
</nav>

<style lang="scss">
  @use 'styles/lib' as *;
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    padding-bottom: px(12);
  }
</style>
