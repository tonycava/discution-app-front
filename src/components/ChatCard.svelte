<script lang="ts">
  import { inview } from 'svelte-inview';
  import { user } from '$lib/stores/user.stores.js';
  import type { Message } from '@models/User';
  export let isLast: boolean;
  export let message: Message;
  export let getMore: () => void;
</script>

{#if (isLast)}
  <li
    use:inview={{}}
    on:enter={getMore}
    class='break-words bg-red-500 text-white w-[calc(50%-.75rem)] mt-2 {message.userId === $user.id ? "ml-auto mr-2" : "ml-2"}'
  >
    {message.message}
  </li>
{:else if (message.userId === $user?.id)}
  <li class='break-words bg-red-500 text-white w-[calc(50%-.75rem)] mt-2 mr-2 ml-auto'>
    {message.message}
  </li>
{:else}
  <li class='break-words bg-blue-500 text-white w-[calc(50%-.75rem)] mt-2 ml-2 '>
    {message.message}
  </li>
{/if}