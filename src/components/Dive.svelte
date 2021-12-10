<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "$components/helpers/Icon.svelte";

  export let text;
  export let visible;

  const dispatch = createEventDispatcher();
  const onClick = () => {
    dispatch("close");
  };
</script>

<div class:visible>
  <p>
    {@html text}
    <button class="x" on:click={onClick}>
      <Icon name="x" />
    </button>
  </p>
</div>

<style>
  div {
    --dur: 250ms;
    position: absolute;
    padding: 7rem 1.5rem;
    z-index: var(--z-top);
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.8);
    transition: opacity var(--dur) ease-in-out;
  }

  div.visible {
    opacity: 1;
    pointer-events: auto;
    cursor: pointer;
  }

  p {
    font-size: clamp(16px, 1.5vw, 24px);
    margin: 0 auto;
    background: var(--color-gray-light);
    padding: 1em;
    opacity: 0;
    max-width: 30em;
    transform: translate(0, -50%);
    transition: all var(--dur) var(--dur) ease-in-out;
    box-shadow: 0 0 0 4px var(--color-gray-dark);
  }

  div.visible p {
    transform: translate(0, 0);
    opacity: 0.8;
  }

  button.x {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1;
    background: var(--color-gray-dark);
    font-size: 1.5em;
    color: var(--color-bg);
    transform: translate(50%, -50%);
    padding: 0.25em;
    pointer-events: all;
  }

  :global(button.x svg) {
    vertical-align: middle;
  }

  @media only screen and (min-width: 1024px) {
    div {
      padding-top: 14rem;
    }
  }
</style>
