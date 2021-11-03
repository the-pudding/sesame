<script>
  import Polygon from "$components/Polygon.svelte";
</script>

<figure>
  <!-- head -->
  <Polygon width="50%" height="50%" path="circle(50% at 50% 50%)" />
</figure>

<style>
  figure {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    /* border: 1px solid red; */
    transform: translate(-50%, -50%);
  }
</style>
