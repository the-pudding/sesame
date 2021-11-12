<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import viewport from "$stores/viewport.js";
  import Sprite from "$components/Sprite.svelte";

  export let visible;

  const BASE = 32;
  const UNITS = 10;
  const SIZE = BASE * UNITS;

  let scale = writable();

  $: scale.set(($viewport.width * 0.9) / SIZE);

  $: setContext("Game", { scale });
</script>

<p>{10} x {5} (scale: {$scale})</p>
<!-- <Stage></Stage> -->
<div class="stage" class:visible style="--scale: {$scale};">
  <Sprite name="hamburger" size={32} />
  <Sprite name="russell" size={64} />
  <Sprite name="hospital" size={128} />
</div>

<style>
  p {
    text-align: center;
  }
  .stage {
    --base: 32px;
    --unitsX: 10;
    --unitsY: 5;
    display: none;
    width: calc(var(--unitsX) * var(--scale) * var(--base));
    height: calc(var(--unitsY) * var(--scale) * var(--base));
    margin: 0 auto;
    position: fixed;
    bottom: 4em;
    left: 50%;
    transform: translate(-50%, 0);
    outline: 1px solid green;
  }

  .visible {
    display: block;
  }
</style>
