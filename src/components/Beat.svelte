<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  export let text;
  export let deep;

  $: center = text.length < 60;
</script>

{#key text}
  <div in:fade={{ delay: 750, duration: 250 }} out:fade={{ duration: 250 }}>
    <p class:center>{@html text}</p>
  </div>
{/key}

<style>
  div {
    pointer-events: none;
    height: 100%;
  }

  p {
    outline: 2px dashed purple;
    max-width: 30em;
    padding: 1em;
    margin: 0 auto;
  }

  p.center {
    text-align: center;
  }
</style>
