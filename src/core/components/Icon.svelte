<script>
  import cn from 'classnames';
  import { pxToRem } from '../utils';

  export let name = '';
  export let size = 16;
</script>

<ion-icon class={cn($$props.class, 'icon')} {name} style={`--icon-size: ${pxToRem(size)}rem`} />

<style lang="scss">
  @use 'styles/lib' as *;
  .icon {
    @include withTransition(
      $properties: (
        color
      )
    );

    color: currentColor;
    font-size: var(--icon-size);
  }
</style>
