<script>
  import { setContext, getContext } from "svelte";
  import { writable } from "svelte/store";
  import viewport from "$stores/viewport.js";
  import Sprite from "$components/Sprite.svelte";
  import Beat from "$components/Beat.svelte";
  import Tap from "$components/helpers/Tap.svelte";

  const { copy } = getContext("App");

  export let visible;

  const UNITS = 10;
  const BASE = 32;
  const SIZE = BASE * UNITS; // 320

  let beatIndex = 0;
  let scale = writable();

  const beats = [].concat(...copy.scenes.map((d) => d.beats));

  const onTap = ({ detail }) => {
    const inc = detail === "right" ? 1 : -1;
    const temp = beatIndex + inc;
    beatIndex = Math.min(Math.max(0, temp), beats.length - 1);
  };

  $: scale.set(($viewport.width * 0.9) / SIZE); // 960 = 3.0

  $: setContext("Game", { scale });
</script>

<div id="game" class:visible>
  <p>{10} x {5} (scale: {$scale})</p>

  <div class="stage" style="--scale: {$scale};">
    <Sprite name="burger" size={32} />
    <Sprite name="russell" size={64} />
    <!-- <Sprite name="hospital" size={128} /> -->
  </div>

  <Beat {beats} index={beatIndex} />

  <Tap debug={false} full={true} enableKeyboard={true} size="50%" on:tap={onTap} />
</div>

<style>
  p {
    text-align: right;
    padding: 0 1em;
  }

  #game {
    display: none;
  }

  #game.visible {
    display: block;
  }

  .stage {
    --base: 32px;
    --unitsX: 10;
    --unitsY: 5;
    width: calc(var(--unitsX) * var(--scale) * var(--base));
    height: calc(var(--unitsY) * var(--scale) * var(--base));
    margin: 0 auto;
    position: fixed;
    bottom: 4em;
    left: 50%;
    transform: translate(-50%, 0);
    outline: 1px solid green;
    pointer-events: none;
  }
</style>
