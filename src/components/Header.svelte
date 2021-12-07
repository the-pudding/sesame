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
    position: fixed;
    z-index: calc(var(--z-overlay) + 1);
    width: 100%;
    top: 0;
    left: 0;
    background: var(--color-bg);
    box-shadow: 0 0 2px 1px var(--color-gray-light);
  }

  .wordmark {
    position: relative;
    margin: 0;
    font-size: 1.5rem;
  }

  .wordmark a {
    display: inline-block;
    background: none;
    text-decoration: none;
    color: var(--color-fg);
    padding: 0.5rem;
  }

  .wordmark a:hover {
    background-color: var(--color-peanut);
  }

  @media only screen and (min-width: 960px) {
    .wordmark {
      font-size: 1.75rem;
    }
  }
</style>
