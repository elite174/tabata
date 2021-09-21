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

  const disableNavigationRoutes = new Set(['/timer']);
</script>

<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  import { ContextKeys } from '$constants';
  import type { RouterStore } from '$store/routerStore';

  import NavigationButton from './NavigationButton.svelte';

  const routerStore = getContext<Writable<RouterStore>>(ContextKeys.RouterStore);

  $: activeRoute = $routerStore.currentPath;
  $: showNavigation = !disableNavigationRoutes.has(activeRoute);

  const handleClick = (route: string) => () => (activeRoute = route);
</script>

{#if showNavigation}
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
{/if}

<style lang="scss">
  @use 'styles/lib' as *;
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    padding-bottom: px(8);
  }
</style>
