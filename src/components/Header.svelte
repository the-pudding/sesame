<script>
  import wordmark from "$svg/wordmark.svg";
</script>

<header>
  <div class="wordmark">
    <a href="https://pudding.cool">The Pudding</a>
  </div>
</header>

<style>
  header {
    position: relative;
    z-index: calc(var(--z-overlay) + 1);
  }
  .wordmark {
    position: relative;
    margin: 0;
    font-size: 1.75rem;
    /* transform-origin: 0 50%; */
    /* transform: rotate(-90deg) translate(-100%, 2em); */
  }

  .wordmark a {
    display: inline-block;
    background: none;
    text-decoration: none;
    color: var(--color-fg);
    padding: 1rem;
  }

  .wordmark a:hover {
    background-color: var(--color-peanut);
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
