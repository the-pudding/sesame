<script>
  import { browser } from "$app/env";
  import { setContext } from "svelte";
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

<Plain visible={plain} />

<Game visible={!plain} />

<div class="toggle">
  <Toggle label="Text Version" bind:value={toggle} />
</div>

<style>
  .toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
    z-index: calc(var(--z-overlay) + 1);
  }
</style>
