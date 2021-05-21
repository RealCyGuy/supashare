<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        error: error.message,
        status: status,
      },
    };
  }
</script>

<script>
  export let error;
  export let status;
</script>

<svelte:head>
  <title>supashare - error {status}</title>
  <meta name="description" content={error} />
</svelte:head>

<h1
  class="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl"
>
  Error {status}: {error}
</h1>
