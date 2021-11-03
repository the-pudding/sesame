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
    border: 1px solid black;
  }

  .visible {
    display: block;
  }

  /* .bg {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    border: clamp(2px, 0.5vw, 8px) solid #3272ff;
    border-radius: 4px;
  }

  .bg:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: url("assets/halftone.svg");
    background-size: 8px;
    background-repeat: repeat;
    transform: translate(-50%, -50%) rotate(20deg);
    opacity: 0.25;
  } */
</style>
