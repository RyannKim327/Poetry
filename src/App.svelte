<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let poems: Record<string, any>[] = [];
  let filter: Record<string, any>[] = [];

  const HOST: string = "http://localhost:8000"; // "https://mpopreverseii.leapcell.app";

  let show = true;
  let poem: Record<string, any> = {};

  onMount(async () => {
    const { data } = await axios.get(`${HOST}/poetry`);
    if (data.data) {
      poems = data.data;
      filter = poems;
      poem = {
        title: poems[0].title,
        content: poems[0].content,
      };
    }
  });
</script>

<div class="flex flex-row h-dvh w-dvw bg-[#fffdd0] gap-2 p-2">
  <div
    class={`flex ${show ? "left-0" : "left-[-100%]"} transition transition-all delay-75 ease-in-out flex-col h-full w-full fixed bg-[#fffdd0] md:static md:w-[calc(25%-1rem)]`}
  >
    <span class="text-[1.5rem] w-full text-center">Poem Lists</span>
    <input
      placeholder="Search title"
      class="m-1"
      type="search"
      onkeyup={(e: KeyboardEvent) => {
        const value = (e.target as HTMLInputElement).value;

        filter = poems.filter((p) =>
          p.title.toLowerCase().includes(value.toLowerCase()),
        );
      }}
    />
    <div
      class="flex flex-col overflow-hidden overflow-y-auto w-full h-full gap-2 p-2"
    >
      {#each filter as poems_}
        <span
          role="button"
          class="bg-[#121212]/15 p-1 rounded cursor-pointer"
          onclick={() => {
            poem = {
              title: poems_.title,
              content: poems_.content,
            };
            show = !show;
          }}
        >
          {poems_.title}
        </span>
      {/each}
    </div>
  </div>
  <div class="flex flex-col h-full w-full md:w-[calc(75%-1rem)]">
    <span
      class="select-none cursor-pointer md:hidden"
      onclick={() => {
        show = !show;
      }}
      >&lt;-
    </span>
    <span class="text-[1.5rem] w-full text-center">{poem.title}</span>
    <div class="flex flex-col gap-1 w-full overflow-y-auto">
      {#each poem.content as content, index}
        {#if index % 4 == 0}
          <p class="select-none text-transparent">.</p>
        {/if}
        <p>{content}</p>
        <hr />
      {/each}
    </div>
  </div>
</div>
