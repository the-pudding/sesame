<script>
  export let title = "The Hidden Layers of Sesame Allergies";
  export let description = "Description TK";
  export let url = "https://pudding.cool";
</script>

<svelte:head>
  <title>{title}</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content={description} />
  <meta name="author" content="The Pudding" />
  <meta name="news_keywords" content="allergies, sesame, falcpa" />

  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="The Pudding" />
  <meta property="og:url" content={url} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="en_US" />

  <meta property="og:image" content="{url}/assets/social/social-facebook.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="600" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="https://pudding.cool" />
  <meta name="twitter:creator" content="@puddingviz" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image:src" content="{url}/assets/social/social-twitter.png" />

  <meta name="robots" content="max-image-preview:large" />

  <link rel="canonical" href="{url}/" />
  <link
    rel="preload"
    href="https://pudding.cool/assets/fonts/cozette/CozetteVector.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
  <link
    rel="preload"
    href="https://pudding.cool/assets/fonts/atkinson/atkinson-hyperlegible-v1-latin-400.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
</svelte:head>
