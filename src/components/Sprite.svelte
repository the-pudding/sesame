<script>
  import { onMount, getContext } from "svelte";
  import { tweened } from "svelte/motion";

  export let name;
  export let steps;
  export let data;
  export let id;

  const { scale, beat } = getContext("Game");

  // 1 / (n - 1)
  let frames = 8;
  let frame = 0;

  const tweenX = tweened(0, { duration: 5000 });

  const animate = async ({
    animation,
    duration,
    delay,
    startX,
    endX,
    startY,
    endY,
    startR,
    endR,
    z,
    flip
  }) => {
    // make our tween
    const t = tweened(startX, { duration, delay });
    await t.set(endX);
    return;
  };

  const run = async () => {
    for (let step of steps) {
      console.log(step.animation);
      await animate(step);
    }
  };
  // onMount(() => {
  //   setInterval(() => {
  //     frame += 1;
  //     if (frame >= frames) frame = 0;
  //   }, 125);
  //   tweenX.set(500);
  // });

  $: id, run();
  // $: pos = `${(frame / (frames - 1)) * 100}% 0`;
  // $: x = `${$tweenX}px`;
</script>

<!-- <div style="--size: {size * $scale}px; --src: url(assets/{name}.png); --x: {x}; --pos: {pos};" /> -->

<!-- <div style="--size: {size * $scale}px; --src: url(assets/{name}.png);" /> -->
<style>
  div {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(var(--x), 0);
    background: var(--src);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: var(--pos);
    width: var(--size);
    height: var(--size);
    outline: 1px solid red;
  }
</style>
