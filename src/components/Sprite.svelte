<script>
  import { onMount, getContext } from "svelte";
  import { tweened } from "svelte/motion";

  export let name;
  export let steps;
  export let data;
  export let id;

  const PATH = "assets/sprites";

  const { scale, beat } = getContext("Game");

  const size = name === "russell" ? 64 : 128;

  // 1 / (n - 1)
  let frames = 8;
  let frame = 0;

  let tween = tweened(0);

  const makeObj = (step, prefix) => {
    return Object.keys(step)
      .filter((d) => d.includes(prefix))
      .reduce((prev, cur) => {
        prev[cur.replace(prefix, "")] = step[cur] || 0;
        return prev;
      }, {});
  };

  const animate = async (step) => {
    // make our tween
    const start = makeObj(step, "start_");
    const end = makeObj(step, "end_");
    const { duration, delay } = step;
    tween = tweened(start, { duration, delay });
    await tween.set(end);
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

<div style="--size: {size * $scale}px; --src: url({PATH}/{name}.png);" />
<p>{$tween.x}</p>

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
