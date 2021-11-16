<script>
  import { getContext } from "svelte";
  const { copy } = getContext("App");
  export let visible;
</script>

<article class:visible>
  {#each copy.scenes as { scene, setting, beats }}
    <section id={scene}>
      <!-- <h2>scene: {scene}</h2> -->
      {#each beats.filter((d) => !d.hide) as { text, alt, deep }}
        <div class="beat">
          {#if alt}
            <p>{@html alt}</p>
          {:else}
            <p>{@html text}</p>
          {/if}
          {#if deep}
            <details>
              <summary>More Info</summary>
              <p>{deep}</p>
            </details>
          {/if}
        </div>
      {/each}
    </section>
  {/each}
</article>

<style>
  article {
    display: none;
    max-width: 25em;
    margin: 0 auto;
    padding: 1em;
  }

  article.visible {
    display: block;
  }

  section {
    margin: 2em 0;
  }

  p {
    margin: 0.5em 0;
  }

  .beat {
    margin-bottom: 2em;
  }

  small {
    color: var(--color-gray-medium);
  }
</style>
