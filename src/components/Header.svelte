<script>
  import wordmark from "$svg/wordmark.svg";
</script>

<header>
  <div class="wordmark">
    <a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
  </div>
</header>

<style>
  .wordmark {
    max-width: 12rem;
    margin: 0;
    padding: 1rem;
  }

  .wordmark a {
    border: none;
    color: var(--color-body);
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
