<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  export let index;
  export let beats;

  $: beat = beats[index];
  $: text = beat.text;
  $: deep = beat.deep;
</script>

{#key index}
  <div transition:fade>
    <p>{@html text}</p>
  </div>
{/key}

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 5em 0;
    pointer-events: none;
  }

  p {
    max-width: 25em;
  }
</style>
