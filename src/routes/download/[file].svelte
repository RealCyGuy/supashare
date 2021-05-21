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
      if (result.data) {
        size = formatSize(result.data.size);
        downloadLink = URL.createObjectURL(result.data);
      }
    });
</script>

<div class="min-h-screen flex justify-center items-center text-white flex-col">
  {#if error}
    <p>{error.message}</p>
  {:else}
    <h1 class="mb-8 text-2xl md:text-3xl max-w-full break-words text-center mx-3">{file}</h1>
    <a
      class="font-light px-3 py-1 border-2 border-green-400 rounded-md hover:border-green-700 duration-75"
      href={downloadLink}
      download={file}>download {size}</a
    >
  {/if}
</div>
