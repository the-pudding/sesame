<script>
  import viewport from "$stores/viewport.js";

  export let visible;

  const BASE = 32;

  $: units = Math.floor((Math.min($viewport.width, $viewport.height) * 0.9) / BASE);
  $: size = BASE * units;
</script>

<p>{size} x {size} ({units})</p>
<div class="stage" class:visible style="--size: {size}px;">
  <!-- <div class="bg" /> -->
  <slot />
</div>

<style>
  p {
    text-align: center;
  }
  .stage {
    --units: 10;
    width: var(--size);
    height: var(--size);
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }

  .visible {
    display: block;
  }
</style>
