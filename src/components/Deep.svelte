<script>
  import { getContext } from "svelte";
  import Icon from "$components/helpers/Icon.svelte";

  export let x;
  export let y;
  export let deep;
  export let delay = 250;
  export let front = false;
  export let visible = false;

  const { scale, BASE } = getContext("Game");

  $: tX = Math.round(x * $scale * BASE);
  $: tY = Math.round(y * $scale * BASE);
  $: deep, (visible = false);
  $: buttonSize = Math.round($scale * BASE);
  $: styleSize = `--size: ${buttonSize}px;`;
  $: styleTransform = `--transform: translate3d(${tX}px, -${tY}px, 0);`;
  $: styleDelay = `--delay: ${delay}ms`;
  $: style = `${styleSize} ${styleTransform} ${styleDelay}`;
</script>

<button class="pulse" class:front {style} on:click={() => (visible = !visible)} />

<div class:visible on:click={() => (visible = false)}>
  <p>{@html deep} <button class="x"><Icon name="x" /></button></p>
</div>

<style>
  button.x {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1;
    background: var(--color-gray-dark);
    font-size: 1.5em;
    color: var(--color-bg);
    transform: translate(50%, -50%);
    padding: 0.25em;
  }

  :global(button.x svg) {
    vertical-align: middle;
  }

  button.pulse {
    position: absolute;
    bottom: calc(var(--size) * -0.5);
    left: calc(var(--size) * -0.5);
    width: var(--size);
    height: var(--size);
    transform: var(--transform);
    outline: none;
    box-shadow: none;
    background: none;
  }
  button.pulse.front {
    z-index: var(--z-top);
  }

  button.pulse:before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform-origin: 50% 50%;
    border-radius: 50%;
    background: var(--color-red);
    animation: pulse 1.25s var(--delay) cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
    opacity: 0;
  }

  div {
    position: absolute;
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
    position: relative;
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

  @keyframes pulse {
    0% {
      opacity: 0.75;
      transform: scale(0.2);
    }
    50%,
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  @media only screen and (max-width: 640px) {
    div {
      align-items: flex-end;
    }

    p {
      max-width: 92.5%;
    }
  }
</style>
