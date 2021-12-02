<script>
  import { setContext, getContext } from "svelte";
  import { writable } from "svelte/store";
  import { fade } from "svelte/transition";
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

  const getSpriteData = (key) => spriteData.find((d) => d.id === key.split("_")[0]);

  $: scale.set(Math.min(MAX_SCALE, ($viewport.width * 0.9) / SIZE));
  $: margin = Math.ceil(($viewport.width - $scale * BASE * UNITS_X) / 2);
  $: setContext("Game", { scale, BASE });

  $: id = beats[beatIndex].id;
  $: text = beats[beatIndex].text;
  $: deep = beats[beatIndex].deep;
  $: cues = cueData.filter((d) => d.id === id && d.sprite);
  $: sprites = groups(cues, (d) => d.key);
  $: style = `--scale: ${$scale}; --margin: ${margin}px; --unitsX: ${UNITS_X}; --unitsY: ${UNITS_Y}; --base: ${BASE}px;`;
</script>

<select bind:value={id} style="position: absolute; top: 0; right: 0; z-index: 10000001;">
  {#each beats as b}
    <option>{b.id}</option>
  {/each}
</select>
<div id="game" class:visible class:outro={id === "outro"}>
  <div class="stage" {style}>
    {#each sprites as [key, steps] (key)}
      <div in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
        <Sprite {id} {steps} name={key.split("_")[0]} data={getSpriteData(key)} />
      </div>
    {/each}
  </div>

  <div class="beats">
    {#if id === "outro"}
      {#each copy.outro as { value }}
        <div class="beat">
          <p>{@html value}</p>
        </div>
      {/each}
    {:else}
      <Beat {text} {deep} />
    {/if}
  </div>

  {#if id !== "outro"}
    <Tap debug={false} full={true} enableKeyboard={true} size="50%" on:tap={onTap} />
  {/if}
</div>

<style>
  #game {
    display: none;
    flex-direction: column;
    height: 100vh;
    padding-top: 3em;
    overflow: hidden;
  }

  #game.visible {
    display: flex;
  }

  #game.outro {
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .stage {
    position: relative;
    min-width: calc(var(--unitsX) * var(--scale) * var(--base));
    min-height: calc(var(--unitsY) * var(--scale) * var(--base));
    width: calc(var(--unitsX) * var(--scale) * var(--base));
    height: calc(var(--unitsY) * var(--scale) * var(--base));
    margin: 0 auto;
    pointer-events: none;
    /* outline: 2px dashed green; */
  }

  .stage:before {
    content: "";
    background-image: linear-gradient(right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
    display: block;
    width: var(--margin);
    height: 110%;
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
    height: 110%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(100%);
    z-index: var(--z-top);
  }

  .beats {
    position: relative;
    flex: 1;
  }

  .beats p {
    max-width: 30em;
    padding: 1em;
    margin: 0 auto;
  }

  select {
    /* display: none; */
  }
</style>
