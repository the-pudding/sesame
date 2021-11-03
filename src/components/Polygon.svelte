<script>
  export let path;
  export let border;
  export let width = "100%";
  export let height = "100%";
  export let top = "0%";
  export let left = "0%";
  export let color = "#3272FF";

  const edges = [0, 1, 2, 3];

  $: style = `
		--path: ${path};
		--width: ${width};
		--height: ${height};
		--top: ${top};
		--left: ${left};
		--border: ${border}px;
		--color: ${color};
		`;
</script>

{#if border}
  {#each edges as i}
    <div class="outline outline-{i}" {style}>
      <div class="shape" />
    </div>
  {/each}
{:else}
  <div class="shape" {style} />
{/if}

<style>
  .outline {
    --p: var(--border);
    --n: calc(var(--border) * -1);
    position: absolute;
    width: var(--width);
    height: var(--width);
    width: 100%;
    height: 100%;
  }

  .outline-0 {
    filter: drop-shadow(var(--p) var(--p) 0 black);
  }
  .outline-1 {
    filter: drop-shadow(var(--n) var(--p) 0 black);
  }
  .outline-2 {
    filter: drop-shadow(var(--p) var(--n) 0 black);
  }
  .outline-3 {
    filter: drop-shadow(var(--n) var(--n) 0 black);
  }

  .shape {
    position: absolute;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--width);
    clip-path: var(--path);
    background: var(--color);
  }
</style>
