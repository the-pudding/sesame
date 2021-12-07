<script>
  import { browser } from "$app/env";
  import { setContext } from "svelte";
  import Meta from "$components/Meta.svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import Plain from "$components/Plain.svelte";
  import Game from "$components/Game.svelte";
  import copy from "$data/doc.json";
  import noScroll from "$utils/noScroll.js";

  setContext("App", { copy });

  let toggle = "off";

  $: plain = toggle === "on";
  $: if (browser)
    plain
      ? window.removeEventListener("scroll", noScroll)
      : window.addEventListener("scroll", noScroll);
</script>

<Meta title={copy.title} description={copy.description} url={copy.url} />

<Plain visible={plain} />

<Game visible={!plain} />

<div class="toggle">
  <Toggle label="Text Version" bind:value={toggle} />
</div>

<style>
  .toggle {
    position: fixed;
    top: 1.25rem;
    right: 1rem;
    font-size: 1rem;
    width: 7em;
    z-index: calc(var(--z-overlay) + 1);
    text-align: center;
  }

  @media only screen and (min-width: 640px) {
    .toggle {
      width: auto;
      text-align: left;
    }
  }

  :global(a[rel="external"]:after) {
    content: "";
    display: inline-block;
    background-image: var(--external);
    background-repeat: no-repeat;
    background-size: cover;
    width: 0.75em;
    height: 0.75em;
    margin-left: 0.25em;
  }
</style>
