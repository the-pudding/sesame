<script>
  import { setContext } from "svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import Plain from "$components/Plain.svelte";
  import Stage from "$components/Stage.svelte";
  import Russell from "$components/Russell.svelte";
  import copy from "$data/doc.json";

  setContext("App", { copy });

  let toggle = "on";

  $: plain = toggle === "on";
</script>

<Plain visible={plain} />

<Stage visible={!plain}>
  <p>We are pixel people at 320px</p>
  <img class="c" src="assets/c.png" />
</Stage>

<div class="toggle">
  <Toggle label="Text Version" bind:value={toggle} />
</div>

<style>
  p {
    position: absolute;
    top: 50%;
    left: 0%;
    /* transform: translate(0, -100%); */
  }

  img {
    position: absolute;
    top: 100%;
    left: 0;
    transform: translate(0, -100%);
    width: 320px;
    height: 320px;
  }

  .toggle {
    position: fixed;
    top: 1em;
    right: 1em;
  }
</style>
