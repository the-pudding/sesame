<script>
  import { getContext } from "svelte";
  import Footer from "$components/Footer.svelte";

  const { copy } = getContext("App");
  export let visible;
</script>

<article class:visible>
  <div class="beat">
    <h1>{copy.title}</h1>
    <p>
      By <a href="https://pudding.cool/author/russell-samora">Russell Samora</a> and
      <a href="https://pudding.cool/author/michelle-pera-mcghee">Michelle Pera-McGhee</a>
    </p>
  </div>
  {#each copy.scenes as { scene, setting, beats }}
    <section id={scene}>
      {#if scene === "outro"}
        {#each copy.outro as { type, value }}
          {#if type === "list"}
            <ul class="beat">
              {#each value as listItem}
                <li>{@html listItem}</li>
              {/each}
            </ul>
          {:else}
            <div class="beat">
              <p>{@html value}</p>
            </div>
          {/if}
        {/each}
      {:else}
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
                <p>{@html deep}</p>
              </details>
            {/if}
          </div>
        {/each}
      {/if}
    </section>
  {/each}

  <div class="beat">
    <details>
      <summary>Our Data and Methods</summary>
      {#each copy.method as { value }}
        <p>{@html value}</p>
      {/each}
    </details>
  </div>
  <div class="beat">
    <details>
      <summary>Citations</summary>
      <ul>
        {#each copy.citations as value}
          <li>{@html value}</li>
        {/each}
      </ul>
    </details>
  </div>
</article>
{#if visible}
  <Footer />
{/if}

<style>
  article {
    display: none;
    max-width: 25em;
    margin: 2em auto;
    padding: 1em;
    font-family: var(--sans);
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

  :global(article ul.beat, article .beat ul) {
    padding-left: 2em;
  }

  :global(article .beat li) {
    font-size: 0.9em;
  }
</style>
