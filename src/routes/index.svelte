<script>
  import { createClient } from "@supabase/supabase-js";
  import { formatSize } from "$lib/size.js";
  let files;
  let name;
  let lastResult;
  let uploading;
  let fileInput;
  let size;
  let over;
  let overCounter = 0;
  let copyArea;
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLIC_KEY
  );
  const maxFileSize = parseInt(import.meta.env.VITE_MAX_FILE_SIZE, 10);
  function upload(event) {
    event.preventDefault();
    if (!uploading) {
      if (files && name) {
        if (files[0].size > maxFileSize * 1000000) {
          return (lastResult =
            "Error: File must be under " + maxFileSize.toString() + "MB.");
        }
        // if (files[0].size > 50000000) {
        //   return (lastResult =
        //     "Error: File must be under 50MB.");
        // }
        console.log("started uploading", name);
        uploading = true;
        supabase.storage
          .from("files")
          .upload(name, files[0])
          .then((result) => {
            uploading = false;
            if (result.error) {
              if (result.error.message.startsWith("duplicate key")) {
                result.error.message = "This file name has been taken";
              }
              lastResult = "Error: " + result.error.message + ".";
            } else {
              lastResult =
                window.location.protocol +
                "//" +
                window.location.host +
                "/download/" +
                name;
            }
          });
      } else {
        lastResult = "Error: You have to fill out all the fields.";
      }
    }
  }
  function fileChange() {
    name = files[0].name;
    size = formatSize(files[0].size);
  }
  function dragEnter(event) {
    event.dataTransfer.dropEffect = "copy";
    overCounter++;
    if (overCounter > 0) {
      over = true;
    }
  }
  function dragLeave(event) {
    overCounter--;
    if (overCounter < 1) {
      over = false;
    }
  }
  function drop(event) {
    files = event.dataTransfer.files;
    overCounter = 0;
    over = false;
    fileChange();
  }
  function click() {
    fileInput.click();
  }
  function keyDown(event) {
    if (event.keyCode === 13) {
      fileInput.click();
    }
  }
  function copy() {
    copyArea.focus();
    copyArea.select();
    document.execCommand("copy");
  }
</script>

<svelte:head>
  <title>supashare</title>
  <meta
    name="description"
    content="A supa simple open-source file sharing website."
  />
</svelte:head>

<div
  class="w-screen h-screen"
  on:dragover|preventDefault
  on:dragenter|stopPropagation|preventDefault={dragEnter}
  on:dragleave|stopPropagation|preventDefault={dragLeave}
  on:drop|stopPropagation|preventDefault={drop}
>
  <form
    class="flex flex-col w-80 text-white border-green-400 border-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg"
    on:submit={upload}
  >
    <input
      class="hidden"
      type="file"
      bind:this={fileInput}
      bind:files
      on:change={fileChange}
    />
    <div
      on:click={click}
      on:keydown={keyDown}
      id="dropzone"
      class="border-2 border-green-400 flex h-40 justify-center items-center relative cursor-pointer rounded-lg focus:ring-2 ring-green-400 ring-offset-black ring-offset-2 outline-none hover:border-green-700 duration-75"
      tabindex="0"
    >
      {#if over}
        <p class="w-1/2 text-center">You can drop that file here!</p>
      {:else}
        <p class="w-2/3 text-center">
          Drag a file or click me to select a file.
        </p>
      {/if}
      {#if files}
        <p class="absolute bottom-0 left-0 p-1">{size}</p>
      {/if}
    </div>
    <label for="name" class="my-1">File name:</label>
    <input
      id="name"
      class="text-white p-1 border-2 border-green-400 bg-black rounded-lg outline-none focus:ring-2 ring-green-400 ring-offset-black ring-offset-2 hover:border-green-700 duration-75"
      type="text"
      bind:value={name}
      placeholder="example.png"
    />
    <button
      class="mx-auto mt-5 px-2 py-1 border-2 border-green-400 inline-flex outline-none focus:outline-none focus:ring-2 ring-green-400 ring-offset-black ring-offset-2 hover:border-green-700 duration-75 rounded-lg"
      >Upload
      {#if uploading}
        <svg
          class="animate-spin mt-0.5 -mr-1 ml-1 h-5 w-5 text-green-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      {/if}
    </button>
    {#if lastResult}
      {#if lastResult.startsWith("Error:")}
        <p class="mt-5 m-auto">{lastResult}</p>
      {:else}
        <p class="m-auto text-center w-3/4 mt-4">
          The download link is:
          <a class="text-green-400 hover:text-green-600" href={lastResult}
            >here</a
          >.
          <span
            class="text-green-400 cursor-pointer hover:text-green-600"
            on:click={copy}>Copy</span
          >.
        </p>
      {/if}
    {/if}
  </form>
  {#if lastResult}
    {#if !lastResult.startsWith("Error:")}
      <textarea class="absolute z-[-1]" bind:this={copyArea}
        >{lastResult}</textarea
      >
    {/if}
  {/if}
</div>
