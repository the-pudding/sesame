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
  <div class="test" />
</Stage>

<div class="toggle">
  <Toggle label="Text Version" bind:value={toggle} />
</div>

<style>
  .test {
    background: red;
    position: absolute;
    top: 100%;
    left: 0;
    transform: translate(0, -100%);
    width: 64px;
    height: 64px;
  }

  .toggle {
    position: fixed;
    top: 1em;
    right: 1em;
  }
</style>
