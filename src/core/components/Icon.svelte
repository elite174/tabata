<script>
  import cn from 'classnames';
  import { pxToRem } from '../utils';

  export let name = '';
  export let size = 16;
</script>

<ion-icon class={cn($$props.class, 'icon')} {name} style={`--icon-size: ${pxToRem(size)}rem`} />

<style>
  .icon {
    visibility: visible !important;

    color: var(--icon-color);
    font-size: var(--icon-size);
  }
</style>
