<script>
  import { onMount, getContext } from "svelte";
  import { tweened } from "svelte/motion";

  export let name;
  export let steps;
  export let data;
  export let id;

  const { scale, BASE } = getContext("Game");

  const src = `--src: url(assets/sprites/${name}.png);`;

  let tween = tweened(0);
  let cycleInterval;
  let frameIndex = 0;
  let frameCount = 0;
  let flip;

  const makeObj = (step, prefix) => {
    return Object.keys(step)
      .filter((d) => d.includes(prefix))
      .reduce((prev, cur) => {
        prev[cur.replace(prefix, "")] = step[cur] || 0;
        return prev;
      }, {});
  };

  const cycle = (frames) => {
    let i = 0;
    frameIndex = 0;
    frameCount = frames.length;
    if (frames.length === 1) return;
    cycleInterval = setInterval(() => {
      i += 1;
      if (i >= frames.length) i = 0;
      frameIndex = frames[i].index;
    }, 125);
  };

  const animate = async (step) => {
    flip = step.flip;

    const frames = data.frames.filter((d) => d.name === step.animation);
    cycle(frames);

    const start = makeObj(step, "start_");
    const end = makeObj(step, "end_");
    const { duration, delay } = step;
    tween = tweened(start, { duration, delay });
    await tween.set(end);
    clearInterval(cycleInterval);
    return;
  };

  const run = async () => {
    for (let step of steps) {
      await animate(step);
    }
  };

  $: id, run();
  $: frame = data.frames.find((d) => d.index === frameIndex);

  $: pos = `--pos: ${$scale * frame.x * -1}px ${$scale * frame.y * -1};`;
  $: size = `--size: ${data.size * $scale}px;`;

  $: x = `${Math.round($tween.x * $scale * BASE)}px`;
  $: y = `${Math.round($tween.y * $scale * BASE)}px`;
  $: r = `${$tween.r * $scale}deg`;
  $: s = flip ? -1 : 1;
  $: transform = `--transform: translate(${x}, ${y}) rotate(${r}) scaleX(${s});`;

  $: style = `${src} ${size} ${pos} ${transform}`;
</script>

<div {style} />

<style>
  div {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: var(--transform);
    background: var(--src);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: var(--pos);
    width: var(--size);
    height: var(--size);
    outline: 1px solid red;
  }
</style>
