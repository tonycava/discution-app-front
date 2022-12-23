<script lang='ts'>
  import type { Message } from '@models/User';
  import { onMount } from 'svelte';
  import TextInput from '@components/form/TextInput.svelte';
  import SendIcon from '@components/SendIcon.svelte';
  import ChatServices from '@services/chat.services';
  import Loading from '@components/Loading.svelte';
  import { applyAction, enhance } from '$app/forms';
  import socket from '$lib/socket/webSocketClient';
  import { user } from '$lib/stores/user.stores.js';
  import Cookies from 'js-cookie';
  import { goto } from '$app/navigation';
  import type { Limit } from '@models/Limit';
  import { inview } from 'svelte-inview';


  export let form: {
    internalError?: string
  };

  let limit: Limit = {
    start: '1',
    end: '100'
  };

  let messages: any[] = [];
  let isLoading = true;
  let isInView = false;

  onMount(async () => {
    try {
      const { data } = await ChatServices.getChats(limit) as Message[];
      messages = data;
      messages[messages.length - 1] = {
        ...messages[messages.length - 1],
        last: true
      };

      console.log(messages);
    } catch (error) {
      Cookies.remove('user');
      Cookies.remove('jwt_token');
      await goto('/login');
    }
    isLoading = false;
  });

  $: isInView ? console.log('on te voit') : console.log('on te voit plus');

  const handleSubmit = (e) => {
    isLoading = true;
    return async ({ result }) => {
      await applyAction(result);
      e.form[0].value = '';
    };
  };

  socket.on('newChat', (chat: Message) => {
    messages = [chat, ...messages];
    isLoading = false;
  });
</script>

{#if isLoading}
  <Loading/>
{/if}

<div class='justify-center items-center flex flex-col w-screen h-screen'>
  <div class='w-full flex justify-center h-96 w-[28%] border-[1.5px] border-white rounded-lg flex-col items-center'>
    <ul class='ti-anchor w-full overflow-y-auto flex flex-col-reverse' id='grid'>
      {#each messages as {message, userId, last}}
        {#if (last)}
          <li use:inview={{}}
              on:enter={({ detail }) => { isInView = detail.inView; }}
              on:leave={({ detail }) => { isInView = detail.inView; }}
              class='break-words bg-red-500 text-white w-[calc(50%-.75rem)] mt-2 mr-2 ml-auto'>
            {message} LAST
          </li>
        {:else if (userId === $user?.id)}
          <li class='break-words bg-red-500 text-white w-[calc(50%-.75rem)] mt-2 mr-2 ml-auto'>
            {message}
          </li>
        {:else}
          <li class='break-words bg-blue-500 text-white w-[calc(50%-.75rem)] mt-2 ml-2 '>
            {message}
          </li>
        {/if}
      {/each}
    </ul>
    <form
      class='w-full flex justify-center items-center mt-auto'
      enctype='multipart/form-data'
      method='post'
      use:enhance={handleSubmit}
    >
      <TextInput error={form?.internalError ?? ""} name='message' placeholder='Message'/>
      <div class='flex justify-center items-center'>
        <button class='w-fit [&>svg]:mt-[75%] absolute flex justify-end mr-5 items-center mr-16' type='submit'>
          <SendIcon/>
        </button>
      </div>
    </form>
  </div>
</div>