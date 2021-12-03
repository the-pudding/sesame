<script>
  import wordmark from "$svg/wordmark.svg";
</script>

<header>
  <div class="wordmark">
    <a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
  </div>
</header>

<style>
  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .wordmark {
    position: relative;
    max-width: 12rem;
    margin: 0;
    padding: 1rem;
    z-index: var(--z-overlay);
    /* transform-origin: 0 50%; */
    /* transform: rotate(-90deg) translate(-100%, 2em); */
  }

  .wordmark a {
    border: none;
    color: var(--color-fg);
  }

  .wordmark a:hover {
    background-color: transparent;
  }

  :global(.wordmark svg path) {
    fill: currentColor;
  }

  @media only screen and (min-width: 960px) {
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
