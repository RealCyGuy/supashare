<script context="module">
  export async function load({ page, fetch, session, context }) {
    return {
      props: {
        file: page.params.file,
      },
    };
  }
</script>

<script>
  import { createClient } from "@supabase/supabase-js";
  import { formatSize } from "$lib/size.js";
  export let file;
  let downloadLink;
  let size = "";
  let error;
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLIC_KEY
  );
  supabase.storage
    .from("files")
    .download(file)
    .then((result) => {
      error = result.error;
      if (error) {
        if (error.status == 400) {
          file = "file not found";
        } else {
          file = "couldn't get file"
        }
      }
      if (result.data) {
        size = formatSize(result.data.size);
        downloadLink = URL.createObjectURL(result.data);
      }
    });
</script>

<svelte:head>
  <title>supashare - {file}</title>
  {#if error}
    <meta name="description" content="There was an error getting this file." />
  {:else}
    <meta name="description" content="Download {file} ({size}) from supashare." />
  {/if}
</svelte:head>

<div class="min-h-screen flex justify-center items-center text-white flex-col">
  {#if error}
    <p>{error.message}.</p>
  {:else}
    <h1
      class="mb-8 text-2xl md:text-3xl max-w-full break-words text-center mx-3"
    >
      {file}
    </h1>
    <a
      class="font-light px-3 py-1 border-2 border-green-400 rounded-md hover:border-green-700 duration-75 focus:ring-2 ring-green-400 ring-offset-black ring-offset-2 outline-none"
      href={downloadLink}
      download={file}>download {size}</a
    >
  {/if}
</div>
