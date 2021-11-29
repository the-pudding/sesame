<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  export let text;
  export let deep;
</script>

{#key text}
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
    padding: 2em;
    pointer-events: none;
  }

  p {
    max-width: 25em;
  }
</style>
