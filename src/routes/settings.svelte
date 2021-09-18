<script>
  import Header from '$components/Header.svelte';
  import Page from '$components/Page.svelte';
  import Switcher from '$components/Switcher.svelte';
  import SettingsHeader from '$features/settings/SettingsHeader.svelte';
  import SettingsRow from '$features/settings/SettingsRow.svelte';

  let on = false;
</script>

<Page>
  <Header text="Settings" />
  <div class="Settings">
    <SettingsHeader>Sounds</SettingsHeader>
    <SettingsRow clickable on:click={() => (on = !on)}>
      <span class="Settings-Text">Sounds</span>
      <Switcher {on} />
    </SettingsRow>
    <SettingsRow clickable on:click={() => (on = !on)}>
      <span class="Settings-Text">Vibration</span>
      <Switcher {on} />
    </SettingsRow>
  </div>
</Page>

<style lang="scss">
  @use 'styles/lib' as *;

  .Settings {
    padding: px(12);

    &-Text {
      @include regular(16);
    }
  }
</style>
