<script>
  import "../app.postcss";
</script>

<div class="absolute top-0 w-full flex items-center justify-between p-3">
  <a class="text-green-400 text-xl" href="/">supashare</a>
  <div />
</div>

<div class="min-h-screen bg-black">
  <slot />
</div>

<footer
  class="absolute bottom-0 w-full flex items-center justify-between p-3 text-white text-sm"
>
  <p>
    made by <a class="text-green-400" href="https://realcyguy.netlify.app"
      >Cyrus Yip</a
    >
  </p>
  <p>
    source on <a
      class="text-green-400"
      href="https://github.com/realcyguy/supashare">GitHub</a
    >
  </p>
</footer>
