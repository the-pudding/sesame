<script>
  export let label;
  export let style = "inner";
  export let options = ["on", "off"];
  export let value = options[0];

  let checked = value === options[0];

  const id = `toggle-${Math.floor(Math.random() * 1000000)}`;

  const handleClick = (event) => {
    const target = event.target;
    const state = target.getAttribute("aria-checked");
    checked = state === "true" ? false : true;
    value = checked ? options[0] : options[1];
  };
</script>

<div class="toggle toggle--{style}">
  <span class="label" {id}>{label}</span>
  <button role="switch" aria-checked={checked} aria-labelledby={id} on:click={handleClick}>
    {#if style === "inner"}
      <span>{options[0]}</span>
      <span>{options[1]}</span>
    {/if}
  </button>
</div>

<style>
  .toggle button,
  .label {
    font-family: inherit;
    font-size: 1em;
  }

  .toggle--inner [role="switch"][aria-checked="true"] :first-child,
  [role="switch"][aria-checked="false"] :last-child {
    display: inline-block;
    border-radius: var(--radius);
    background: var(--color-off-black);
    color: var(--color-off-white);
  }

  .toggle--inner button {
    padding: 0.25em;
    background-color: var(--color-white);
    border: 2px solid var(--color-off-black);
  }

  @media only screen and (min-width: 640px) {
    .toggle--inner button {
      margin-left: 0.5em;
    }
  }

  .toggle--inner button span {
    user-select: none;
    pointer-events: none;
    display: inline-block;
    line-height: 1;
    padding: 0.25em 0.5em;
  }

  .toggle--inner button:focus {
    outline: 1px var(--color-focus);
  }

  .toggle--slider {
    display: flex;
    align-items: center;
  }

  .toggle--slider button {
    position: relative;
    background: var(--color-gray-light);
  }

  .toggle--slider button:focus {
    outline: 1px solid var(--color-focus);
  }

  .toggle--slider button::before {
    content: "";
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    background: var(--color-white);
    border-radius: var(--radius);
    top: 0.25em;
    right: 1.75em;
  }

  .toggle--slider button[aria-checked="true"] {
    background-color: var(--color-off-black);
  }

  .toggle--slider button[aria-checked="true"]::before {
    transform: translateX(1.5em);
  }
</style>
