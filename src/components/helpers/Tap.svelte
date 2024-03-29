<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "$components/helpers/Icon.svelte";

  export let debug = false;
  export let enableKeyboard = false;
  export let full = false;
  export let showArrows = false; // boolean or array of directions
  export let disable = [];
  export let directions = ["left", "right"];
  export let size = "64px";
  export let arrowSize = "48px";
  export let arrowStroke = "#000";
  export let arrowStrokeWidth = "2";
  export let arrowPosition = "center"; // start, center, end

  const dispatch = createEventDispatcher();
  let innerHeight;

  $: getW = (dir) => (["left", "right"].includes(dir) ? size : full ? "100%" : size);
  $: getH = (dir) => (["up", "down"].includes(dir) ? size : full ? "100%" : size);

  $: onKeyDown = (e) => {
    const dir = e.key.replace("Arrow", "").toLowerCase();
    const hasDir = directions.includes(dir);
    if (enableKeyboard && hasDir) {
      e.preventDefault();
      dispatch("tap", dir);
    }
  };

  $: visibleArrows = directions.filter((d) =>
    typeof showArrows === "boolean" ? showArrows : showArrows.includes(d)
  );
</script>

<svelte:window on:keydown={onKeyDown} bind:innerHeight />

<section class="tap" class:debug style="height: {innerHeight}px;">
  {#each directions as dir}
    <button
      on:click={dispatch("tap", dir)}
      style="width: {getW(dir)}; height: {getH(dir)};"
      aria-label={dir}
      class="{dir} {arrowPosition}"
      class:full
      disabled={disable.includes(dir)}
    >
      {#if disable.includes("left")}
        <span class="label">Start</span>
      {/if}

      {#if disable.includes("right")}
        <span class="label">Story</span>
      {/if}

      {#if visibleArrows.includes(dir)}
        <span style="font-size: {arrowSize};"
          ><Icon name="chevron-{dir}" stroke={arrowStroke} strokeWidth={arrowStrokeWidth} /></span
        >
      {/if}
    </button>
  {/each}
</section>

<style>
  section {
    --dur: 150ms;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-overlay);
    pointer-events: none;
  }

  button {
    position: absolute;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    background: none;
    border-radius: 0;
    outline: none;
    border: none;
    box-shadow: none;
    pointer-events: auto;
    display: flex;
    justify-content: center;
    transition: all var(--dur) ease-in-out;
    line-height: 1;
  }

  button:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-gray-light);
    opacity: 0.5;
    transition: opacity var(--dur) ease-in-out;
  }

  button:disabled {
    opacity: 0;
    pointer-events: none;
  }

  .full:hover:before {
    opacity: 0.1;
  }

  .left {
    left: 0;
    top: 0;
    /* text-align: left; */
  }

  .right {
    right: 0;
    top: 0;
    /* text-align: right; */
  }

  .left.start,
  .right.start {
    align-items: flex-start;
  }

  .left.center,
  .right.center {
    top: 50%;
    transform: translateY(-50%);
  }

  .left.end,
  .right.end {
    bottom: 1em;
    top: auto;
    align-items: center;
  }

  .left.end {
    left: 1em;
  }

  .right.end {
    right: 1em;
  }

  .up {
    top: 0;
    left: 0;
    /* text-align: center; */
  }

  .down {
    bottom: 0;
    left: 0;
    /* text-align: center; */
  }

  .up.center,
  .down.center {
    left: 50%;
    transform: translateX(-50%);
  }

  .up.end,
  .down.end {
    right: 0;
    left: auto;
  }

  /* full positions */
  .full:before {
    opacity: 0;
  }

  .full.left.start,
  .full.right.start {
    align-items: flex-start;
  }

  .full.left.center,
  .full.right.center {
    align-items: center;
  }

  .full.left.end,
  .full.right.end {
    align-items: flex-end;
  }

  .full.up.start,
  .full.down.start {
    justify-content: flex-start;
  }

  .full.up.center,
  .full.down.center {
    justify-content: center;
  }

  .full.up.end,
  .full.down-end {
    justify-content: flex-end;
  }

  span {
    display: inline-block;
    line-height: 1;
    opacity: 1;
    transform-origin: 50% 50%;
    transition: all var(--dur) ease-in-out;
  }

  .full span {
    opacity: 0.33;
  }

  .full:hover span {
    opacity: 1;
    transform: scale(1.25);
  }

  .debug .left {
    background: red;
    opacity: 0.5;
  }

  .debug .right {
    background: red;
    opacity: 0.5;
  }

  .debug .up {
    background: orange;
    opacity: 0.5;
  }

  .debug .down {
    background: orange;
    opacity: 0.5;
  }

  button .label {
    color: var(--color-gray-dark);
    text-transform: uppercase;
    font-size: 0.75em;
    opacity: 0.75;
  }

  .full:hover .label {
    transform: none;
    opacity: 1;
  }

  :global(.tap span svg) {
    vertical-align: middle;
  }

  @media only screen and (max-width: 1024px) {
    button {
      outline: 4px solid var(--color-bg);
    }

    button::before {
      opacity: 1;
    }

    button .label {
      background: var(--color-bg);
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -100%);
      width: 100%;
      padding: 0.25em 0;
      display: inline-block;
      opacity: 1;
      /* outline: 4px solid var(--color-bg); */
    }
  }
</style>
