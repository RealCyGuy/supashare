<script>
  import "../app.postcss";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=KoHo&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="absolute top-0 w-full flex items-center justify-between p-3">
  <a class="text-green-400 text-xl hover:text-green-600" href="/">supashare</a>
  <div />
</div>

<div class="min-h-screen bg-black">
  <slot />
</div>

<footer
  class="absolute bottom-0 w-full flex items-center justify-between p-3 text-white text-sm"
>
  <p>
    made by <a
      class="text-green-400 hover:text-green-600"
      href="https://realcyguy.netlify.app">Cyrus Yip</a
    >
  </p>
  <p>
    source on <a
      class="text-green-400 hover:text-green-600"
      href="https://github.com/realcyguy/supashare">GitHub</a
    >
  </p>
</footer>
