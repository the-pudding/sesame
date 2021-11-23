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

  const UNITS_X = 10;
  const UNITS_Y = 4;
  const BASE = 32;
  const SIZE = BASE * UNITS_X;
  const MAX_SCALE = 4;

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
  $: margin = Math.ceil(($viewport.width - $scale * BASE * UNITS_X) / 2);
  $: setContext("Game", { scale, BASE });

  $: id = beats[beatIndex].id;
  $: text = beats[beatIndex].text;
  $: deep = beats[beatIndex].deep;
  $: cues = cueData.filter((d) => d.id === id);
  $: sprites = groups(cues, (d) => d.sprite);
  $: style = `--scale: ${$scale}; --margin: ${margin}px; --unitsX: ${UNITS_X}; --unitsY: ${UNITS_Y}; --base: ${BASE}px;`;
</script>

<div id="game" class:visible>
  <p>(scale: {$scale})</p>

  <div class="stage" {style}>
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
    width: calc(var(--unitsX) * var(--scale) * var(--base));
    height: calc(var(--unitsY) * var(--scale) * var(--base));
    margin: 0 auto;
    position: fixed;
    bottom: 4em;
    left: 50%;
    transform: translate(-50%, 0);
    pointer-events: none;
    outline: 2px dashed green;
  }

  .stage:before {
    content: "";
    background-image: linear-gradient(right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
    display: block;
    width: var(--margin);
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
    width: var(--margin);
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(100%);
    z-index: var(--z-top);
  }
</style>
