<script>
  import { browser } from "$app/env";
  import { onMount, setContext, getContext } from "svelte";
  import { writable } from "svelte/store";
  import { fade } from "svelte/transition";
  import { groups, format } from "d3";
  import viewport from "$stores/viewport.js";
  import Sprite from "$components/Sprite.svelte";
  import Deep from "$components/Deep.svelte";
  import Dive from "$components/Dive.svelte";
  import Beat from "$components/Beat.svelte";
  import Tap from "$components/helpers/Tap.svelte";
  import Footer from "$components/Footer.svelte";
  import cueData from "$data/cues.js";
  import spriteData from "$data/sprites.json";
  import noScroll from "$utils/noScroll.js";
  import preload from "$utils/preload.js";
  import variables from "$data/variables.json";
  import mq from "$stores/mq.js";

  const { copy } = getContext("App");

  export let visible;

  const UNITS_X = 10;
  const UNITS_Y = 4;
  const BASE = 32;
  const SIZE = BASE * UNITS_X;
  const MAX_SCALE = 4;
  const HEIGHT_BP = 960;

  let diveMode = false;
  let diveText = undefined;
  let beatIndex = 0;
  let scale = writable();

  const beats = [].concat(...copy.scenes.map((d) => d.beats));

  const onTap = ({ detail }) => {
    const inc = detail === "right" ? 1 : -1;
    const temp = beatIndex + inc;
    beatIndex = Math.min(Math.max(0, temp), beats.length - 1);
    window.scrollTo(0, 0);
  };

  const getSpriteData = (key) => spriteData.find((d) => d.id === key.split("_")[0]);

  const calcScale = (w, h) => {
    if (mobile) return w / SIZE;

    let widthScale = Math.min(MAX_SCALE, w / SIZE);

    if (widthScale < 4) widthScale -= 0.5;
    else widthScale -= 0.2;

    const min = 540;
    const upper = Math.min(Math.max(min, h), HEIGHT_BP);
    const factor = 0.5 + ((upper - min) / (HEIGHT_BP - min)) * 0.45;
    const shrink = factor * widthScale;

    return shrink;
  };

  const onDive = ({ detail }) => {
    diveText = detail;
    diveMode = true;
  };
  const onClose = () => {
    diveMode = false;
  };

  $: mobile = !$mq.lg;
  $: scale.set(calcScale($viewport.width, $viewport.height));
  $: margin = Math.ceil(($viewport.width - $scale * BASE * UNITS_X) / 2);
  $: setContext("Game", { scale, BASE });

  $: id = beats[beatIndex].id;
  $: text = beats[beatIndex].text;
  $: tx = mobile ? beats[beatIndex].tx || 0 : 0;
  $: ts = mobile ? beats[beatIndex].ts || 1.3 : 1;
  $: beatIndex, (diveText = undefined);
  $: deep = { ...beats[beatIndex] };

  $: outro = id === "outro";
  $: cues = cueData.filter((d) => d.id === id && d.sprite);
  $: sprites = groups(cues, (d) => d.key);
  $: style = `--scale: ${$scale}; --margin: ${margin}px; --unitsX: ${UNITS_X}; --unitsY: ${UNITS_Y}; --base: ${BASE}px; --tX: ${tx}; --tS: ${ts};`;
  $: tapWidth = format(".1%")(($viewport.width - UNITS_X * $scale * BASE) / 2 / $viewport.width);
  $: disable = beatIndex === 0 ? ["left"] : beatIndex === beats.length - 1 ? ["right"] : [];
  $: if (browser)
    outro
      ? window.removeEventListener("scroll", noScroll)
      : window.addEventListener("scroll", noScroll);

  onMount(() => {
    preload(cueData);
  });
</script>

<div id="game" class:visible class:outro style="{style} height: {$viewport.height + 1}px;">
  <div class="stage" class:diveMode>
    {#each sprites as [key, steps] (key)}
      <div in:fade={{ duration: 0 }} out:fade={{ duration: 150 }}>
        <Sprite {id} {steps} name={key.split("_")[0]} data={getSpriteData(key)} />
      </div>
    {/each}

    <div class="deep">
      {#if deep.deep}
        {#key deep.deep}
          <Deep {...deep} on:dive={onDive} />
        {/key}
      {/if}
    </div>
  </div>

  <div class="dive">
    <Dive text={diveText} visible={diveMode} on:close={onClose} />
  </div>

  <div class="beats">
    {#if outro}
      {#each copy.outro as { type, value }}
        <div class="beat" in:fade={{ delay: 300, duration: 150 }} out:fade={{ duration: 50 }}>
          {#if type === "list"}
            <ul>
              {#each value as v}
                <li>{@html v}</li>
              {/each}
            </ul>
          {:else}
            <p>{@html value}</p>
          {/if}
        </div>
      {/each}
      <div class="beat" in:fade={{ delay: 300, duration: 150 }} out:fade={{ duration: 50 }}>
        <details>
          <summary>Data and Methods</summary>
          {#each copy.method as { value }}
            <p>{@html value}</p>
          {/each}
        </details>
      </div>
      <Footer />
    {:else}
      <Beat {text} />
    {/if}
  </div>

  <Tap
    {disable}
    debug={false}
    full={!mobile}
    showArrows={true}
    enableKeyboard={true}
    size={mobile ? "12vw" : tapWidth}
    arrowSize={mobile ? "8vw" : "5vw"}
    arrowPosition={mobile ? "end" : "center"}
    arrowStroke={variables.color["gray-dark"]}
    on:tap={onTap}
  />
</div>

<style>
  #game {
    display: none;
    flex-direction: column;
    overflow: hidden;
  }

  #game.visible {
    display: flex;
  }

  #game.outro {
    height: auto !important;
  }

  .dive {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-top);
    pointer-events: none;
  }

  .stage {
    position: relative;
    min-width: calc(var(--unitsX) * var(--scale) * var(--base));
    min-height: calc(var(--unitsY) * var(--scale) * var(--base));
    width: calc(var(--unitsX) * var(--scale) * var(--base));
    height: calc(var(--unitsY) * var(--scale) * var(--base));
    margin: 0 auto;
    margin-top: 5rem;
    overflow: hidden;
    opacity: 1;
    transition: transform 1s ease-in-out, opacity 250ms ease-in-out;
    transform-origin: 50% 100%;
    transform: translateX(calc(var(--scale) * var(--tX) * var(--base))) scale(var(--tS));
  }

  .stage:before {
    content: "";
    background-image: linear-gradient(
      right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    display: block;
    width: calc(var(--scale) * var(--base));
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: var(--z-top);
    pointer-events: none;
  }

  .stage:after {
    content: "";
    background-image: linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    display: block;
    width: calc(var(--scale) * var(--base));
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: var(--z-top);
    pointer-events: none;
  }

  .beats {
    position: relative;
    flex: 1;
  }

  .beats div {
    max-width: 30em;
    margin: 0 auto;
    padding: 0 1em;
  }

  .beats ul {
    padding-left: 2em;
  }

  .beats li {
    margin-bottom: 1em;
  }

  .beats p {
    margin: 1.5em 0;
  }

  @media only screen and (max-width: 1024px) {
    .stage {
      margin-top: 10rem;
    }

    .stage:before,
    .stage:after {
      display: none;
    }
  }
</style>
