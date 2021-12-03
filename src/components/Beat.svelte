<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  export let text;

  let el;
  let center = false;

  $: if (el) center = el.innerText.length < 60;
</script>

{#key text}
  <div in:fade={{ delay: 500, duration: 250 }} out:fade={{ duration: 50 }}>
    <p bind:this={el} class:center>{@html text}</p>
  </div>
{/key}

<style>
  div {
    height: 100%;
  }

  p {
    /* outline: 2px dashed purple; */
    max-width: 30em;
    padding: 1em;
    margin: 0 auto;
  }

  p.center {
    text-align: center;
  }
</style>
