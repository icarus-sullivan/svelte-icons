<script>
  import { onMount } from 'svelte';

  let visible = true;
  let io = null;
  let added = false;
  let el;

  $: if (el && io && !added) {
    added = true;
    io.observe(el);
  }

  onMount(() => {
    io = new IntersectionObserver((entries) => {
      const entry = entries.pop();

      visible = entry.isIntersecting;
    }, {
        root: null,
        rootMargin: '0px',
        threshold: [0],
    });

    return () => io.disconnect();
  });
</script>


<div bind:this={el} {...$$props}>
  {#if visible}
    <slot />
  {/if}
</div>