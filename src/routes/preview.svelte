<script>
  import Input from '$components/Input.svelte';
  import Timer from '$features/timer/Timer.svelte';
  import { onMount } from 'svelte';

  let time = 10;

  onMount(() => {
    let timer = 0;
    const start = () => {
      if (time === 0) {
        return;
      }

      time -= 1;

      setTimeout(start, 1000);
    };

    start();
  });
</script>

<Timer {time} stage="work" />
