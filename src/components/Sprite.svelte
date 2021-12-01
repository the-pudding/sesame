<script>
  import { base } from "$app/paths";
  import { onMount, getContext } from "svelte";
  import { tweened } from "svelte/motion";
  import runWithCancel from "$utils/runWithCancel.js";

  export let name;
  export let steps;
  export let data;
  export let id;

  const { scale, BASE } = getContext("Game");
  const FRAMERATE = 100;

  const path = `${base}/assets/sprites/${name}.png`;
  const src = `--src: url(${path});`;

  let tween = tweened({ x: 10, y: 0, r: 0 });
  let cycleInterval;
  let frameIndex = 0;
  let flip;
  let z;

  const pause = (delay) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

  const makeObj = (step, prefix) => {
    return Object.keys(step)
      .filter((d) => d.includes(prefix))
      .reduce((prev, cur) => {
        prev[cur.replace(prefix, "")] = step[cur] || 0;
        return prev;
      }, {});
  };

  const move = async (step) => {
    const start = makeObj(step, "start_");
    const end = makeObj(step, "end_");
    const { duration } = step;
    tween = tweened(start, { duration });
    await tween.set(end);
    return;
  };

  const jump = (step) => {
    const start = makeObj(step, "start_");
    tween.set(start, { duration: 0 });
  };

  const cycle = (step) => {
    const frames = data.frames.filter((d) => d.name === step.cycle);

    jump(step);

    if (!frames.length) {
      frameIndex = 0;
      return;
    }

    frameIndex = frames[0].index;

    let i = 0;
    cycleInterval = setInterval(() => {
      i += 1;
      if (i >= frames.length) {
        if (step.once) {
          i -= 1;
          clearInterval(cycleInterval);
        } else i = 0;
      }
      frameIndex = frames[i].index;
    }, FRAMERATE);
  };

  function* run() {
    for (let step of steps) {
      if (step.delay) yield pause(step.delay);
      if (cycleInterval) clearInterval(cycleInterval);

      // "globals"
      flip = step.flip;
      z = step.z;

      cycle(step);

      // do a one time transform tween
      if (step.duration) yield move(step);

      // repeat step
      // TODO optimize?
      if (step.loop) steps.push({ ...step });
    }
    // TODO auto finish back on idle?
  }

  const start = () => {
    if (cancelFn) cancelFn();

    const { promise, cancel } = runWithCancel(run);
    promise.then(() => {}).catch(() => {});
    return cancel;
  };

  $: cancelFn = start(id);
  $: frame = data.frames.find((d) => d.index === frameIndex);

  $: x = `${Math.round($tween.x * $scale * BASE)}px`;
  $: y = `${Math.round($tween.y * $scale * BASE * -1)}px`;
  $: r = `${$tween.r * $scale}deg`;
  $: s = flip ? -1 : 1;

  $: transform = `--transform: translate(${x}, ${y}) rotate(${r}) scaleX(${s});`;
  $: pos = `--pos: ${$scale * frame.x * -1}px ${$scale * frame.y * -1};`;
  $: size = `--size: ${data.size * $scale}px;`;
  $: zIndex = `--z-index: ${z || 0};`;

  $: style = `${src} ${size} ${pos} ${transform} ${zIndex}`;

  onMount(() => {
    return () => {
      if (cycleInterval) clearInterval(cycleInterval);
    };
  });
</script>

<div {style} />

<style>
  div {
    position: absolute;
    bottom: 0;
    left: 0;
    transform-origin: 50% 100%;
    transform: var(--transform);
    background: var(--src);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: var(--pos);
    width: var(--size);
    height: var(--size);
    z-index: var(--z-index);
    /* outline: 2px dashed red; */
  }
</style>
