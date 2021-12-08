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

<div class="toggle" tab-index="1">
  <Toggle label="Text Version" bind:value={toggle} />
</div>

<Plain visible={plain} />

<Game visible={!plain} />

<style>
  .toggle {
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1rem;
    z-index: calc(var(--z-overlay) + 1);
    text-align: center;
    background: var(--color-bg);
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
