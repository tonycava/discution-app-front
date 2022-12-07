<script lang='ts'>
  import type { Message } from '@models/User';
  import { onMount } from 'svelte';
  import TextInput from '@components/form/TextInput.svelte';
  import SendIcon from '@components/SendIcon.svelte';
  import ChatServices from '@services/chat.services';
  import Loading from '@components/Loading.svelte';
  import { applyAction, enhance } from '$app/forms';
  import socket from '$lib/socket/webSocketClient';
  import { user } from '$lib/stores/user.stores';
  import Cookies from 'js-cookie';
  import { goto } from '$app/navigation';

  let value = '';

  export let form: {
    internalError?: string
  };

  let messages: Message[] = [];
  let isLoading = true;

  onMount(async () => {
    try {
      const { data } = await ChatServices.getChats() as Message[];
      messages = data;
    } catch (error) {
      Cookies.remove('user');
      Cookies.remove('jwt_token');
      await goto('/login');
    }
    isLoading = false;
  });

  const handleSubmit = () => {
    isLoading = true;
    return async ({ result }) => {
      await applyAction(result);
      isLoading = false;
    };
  };

  socket.on('newChat', (chat: Message) => {
    value = '';
    messages = [chat, ...messages];
    isLoading = false;
  });
</script>

{#if isLoading}
	<Loading />
{/if}

<div class='justify-center items-center flex flex-col w-screen h-screen'>
	<div class='w-full flex justify-center h-96 w-[28%] border-[1.5px] border-white rounded-lg flex-col items-center'>
		<ul class='ti-anchor w-full overflow-y-auto flex flex-col-reverse' id='grid'>
			{#each messages as message}
				{#if (message.userId === $user.id)}
					<li
						class='break-words bg-red-500 ml-auto w-[calc(50%-.75rem)] text-white col-start-2 mt-2 mr-2'>{message.message}</li>
				{:else}
					<li
						class='break-words bg-blue-500 text-white col-start-1 w-[calc(50%-.75rem)] col-end-3 ml-2 mt-2'>{message.message}</li>
				{/if}
			{/each}
		</ul>
		<form
			class='w-full flex justify-center items-center mt-auto'
			enctype='multipart/form-data'
			method='post'
			use:enhance={handleSubmit}
		>

			<TextInput bind:value error={form?.internalError ?? ""} name='message' placeholder='Message' />
			<div class='absolute w-[28%] flex justify-center items-center'>
				<button class='w-fit absolute mt-1 flex justify-end mr-5 items-center' type='submit'>
					<SendIcon />
				</button>
			</div>
		</form>
	</div>
</div>
