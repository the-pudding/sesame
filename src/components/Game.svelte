<script>
  import { setContext, getContext } from "svelte";
  import { writable } from "svelte/store";
  import { groups } from "d3";
  import viewport from "$stores/viewport.js";
  import Sprite from "$components/Sprite.svelte";
  import Beat from "$components/Beat.svelte";
  import Tap from "$components/helpers/Tap.svelte";
  import cueData from "$data/cues.js";
  import spriteData from "$data/sprites.json";

  const { copy } = getContext("App");

  export let visible;

  const UNITS = 10;
  const BASE = 32;
  const SIZE = BASE * UNITS;
  const MAX_SCALE = 5;

  let beatIndex = 0;
  let scale = writable();

  const beats = [].concat(...copy.scenes.map((d) => d.beats));

  const onTap = ({ detail }) => {
    const inc = detail === "right" ? 1 : -1;
    const temp = beatIndex + inc;
    beatIndex = Math.min(Math.max(0, temp), beats.length - 1);
  };

  const getSpriteData = (name) => spriteData.find((d) => d.id === name);

  $: scale.set(Math.min(MAX_SCALE, ($viewport.width * 0.9) / SIZE));

  $: setContext("Game", { scale, BASE });

  $: id = beats[beatIndex].id;
  $: text = beats[beatIndex].text;
  $: deep = beats[beatIndex].deep;
  $: cues = cueData.filter((d) => d.id === id);
  $: sprites = groups(cues, (d) => d.sprite);
</script>

<div id="game" class:visible>
  <p>{10} x {5} (scale: {$scale})</p>

  <div class="stage" style="--scale: {$scale};">
    {#each sprites as [name, steps] (name)}
      <Sprite {id} {name} {steps} data={getSpriteData(name)} />
    {/each}
  </div>

  <Beat {text} {deep} />

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

  .stage:before {
    content: "";
    background-image: linear-gradient(right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
    display: block;
    width: 10%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: var(--z-top);
  }

  .stage:after {
    content: "";
    background-image: linear-gradient(left, rgba(0, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
    display: block;
    width: 10%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(100%);
    z-index: var(--z-top);
  }
</style>
