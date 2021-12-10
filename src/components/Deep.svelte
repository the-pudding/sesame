<script>
  import { getContext, createEventDispatcher } from "svelte";
  import Icon from "$components/helpers/Icon.svelte";

  export let x;
  export let y;
  export let deep;
  export let delay = 250;
  export let front = false;
  export let visible = false;
  export let ts = 1;

  const { scale, BASE } = getContext("Game");

  const dispatch = createEventDispatcher();

  const onClick = () => {
    dispatch("dive", deep);
  };

  $: tX = Math.round(x * $scale * BASE);
  $: tY = Math.round(y * $scale * BASE);
  $: deep, (visible = false);
  $: buttonSize = Math.round($scale * BASE);
  $: styleSize = `--size: ${buttonSize}px;`;
  $: styleTransform = `--transform: translate3d(${tX}px, -${tY}px, 0);`;
  $: styleDelay = `--delay: ${delay}ms`;
  $: style = `${styleSize} ${styleTransform} ${styleDelay}`;
  $: textScale = `--scale: ${1 / ts}`;
</script>

<button class="pulse" class:front {style} on:click={onClick} />

<style>
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
    transform: scale(0.2);
    background: var(--color-red);
    animation: pulse 1.25s var(--delay) cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
    opacity: 0;
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
</style>
