<script>
  import { getContext } from "svelte";
  export let x;
  export let y;
  export let deep;
  export let size = 1;
  export let delay = 0;
  export let front = false;

  let visible = false;
  const { scale, BASE } = getContext("Game");

  $: tX = x * $scale * BASE;
  $: tY = y * $scale * BASE;
  $: deep, (visible = false);
  $: styleSize = `--size: ${$scale * BASE * size}px;`;
  $: styleTransform = `--transform: translate3d(${tX}px, -${tY}px, 0);`;
  $: styleDelay = `--delay: ${delay}ms`;
  $: style = `${styleSize} ${styleTransform} ${styleDelay}`;
</script>

<button class:front {style} on:click={() => (visible = !visible)} />

<div class:visible on:click={() => (visible = false)}>
  <p>{@html deep}</p>
</div>

<style>
  button {
    position: absolute;
    bottom: 0;
    left: 0;
    width: var(--size);
    height: var(--size);
    transform: var(--transform);
    outline: none;
    box-shadow: none;
  }
  button.front {
    z-index: 100;
    background: rgba(255, 255, 255, 0);
  }

  button:before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 50% 50%;
    border-radius: 50%;
    background: var(--color-red);
    animation: pulse 1.25s var(--delay) cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
    opacity: 0;
  }

  @keyframes pulse {
    0% {
      opacity: 0.75;
      transform: translate(-50%, -50%) scale(0.2);
    }
    50%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }

  div {
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    padding: 1em;
    z-index: var(--z-top);
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    transition: all 250ms ease-in-out;
  }

  div.visible {
    opacity: 1;
    pointer-events: auto;
    cursor: pointer;
  }

  p {
    font-size: max(16px, 0.75em);
    max-width: 50%;
    margin: 0 auto;
    background: var(--color-gray-light);
    padding: 1em;
    transform: translate(0, -50%);
    opacity: 0;
    transition: all 250ms 250ms ease-in-out;
    box-shadow: 0 0 0 4px var(--color-gray-dark);
  }

  div.visible p {
    transform: translate(0, 0);
    opacity: 0.8;
  }
</style>
