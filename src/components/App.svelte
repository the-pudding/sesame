<script>
  import { setContext } from "svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import Plain from "$components/Plain.svelte";
  import Game from "$components/Game.svelte";
  import Russell from "$components/Russell.svelte";
  import copy from "$data/doc.json";

  setContext("App", { copy });

  let toggle = "on";

  $: plain = toggle === "on";
</script>

<Plain visible={plain} />

<Game visible={!plain}>
  <img class="c" src="assets/c.png" alt="character" />
</Game>

<div class="toggle">
  <Toggle label="Text Version" bind:value={toggle} />
</div>

<style>
  img {
    position: absolute;
    top: 100%;
    left: 0;
    transform: translate(0, -100%);
    width: 196px;
    height: 196px;
  }

  .toggle {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    font-size: 1rem;
  }
</style>
