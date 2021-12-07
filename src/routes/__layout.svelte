<script>
  import { base } from "$app/paths";
  import "$styles/app.css";
  import Header from "$components/Header.svelte";

  const style = `--external: url("${base}/assets/images/external-link.svg");`;
</script>

<Header />
<main id="content" {style}>
  <slot />
</main>
