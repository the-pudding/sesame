<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import mq from "$stores/mq.js";

  export let text;

  let el;
  let center = false;

  $: mobile = !$mq.lg;
  $: len = mobile ? 15 : 60;
  $: if (el) center = el.innerText.length < len;
</script>

{#key text}
  <div in:fade={{ delay: 500, duration: 250 }} out:fade={{ duration: 50 }}>
    <p bind:this={el} class:center>{@html text}</p>
  </div>
{/key}

<style>
  div {
    height: 100%;
    margin-top: 0.5em;
  }

  p {
    max-width: 30em;
    padding: 1em;
    margin: 0 auto;
  }

  p.center {
    text-align: center;
  }

  :global(span.note) {
    font-size: 0.75em;
    display: block;
    font-style: italic;
    margin-top: 1em;
    opacity: 0;
    animation: appear 250ms 3.6s linear forwards;
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  :global(#game .color-red) {
    background-color: var(--color-red);
  }

  :global(#game .color-green) {
    background-color: var(--color-green);
  }

  :global(#game .color-green-dark) {
    background-color: var(--color-green-dark);
    color: var(--color-bg);
  }

  :global(#game .color-pink) {
    background-color: var(--color-pink);
  }

  :global(#game .color-pink-dark) {
    background-color: var(--color-pink-dark);
    color: var(--color-bg);
  }

  :global(#game .color-peanut) {
    background-color: var(--color-peanut);
  }

  :global(#game .color-sesame) {
    background-color: var(--color-sesame);
  }

  :global(#game .color-cashew) {
    background-color: var(--color-cashew);
  }

  @media only screen and (min-width: 1024px) {
    div {
      margin-top: 1em;
    }
  }
</style>
