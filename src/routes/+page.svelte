<script lang='ts'>
  import type { Group, Message } from '@models/User';
  import TextInput from '@components/form/TextInput.svelte';
  import SendIcon from '@components/SendIcon.svelte';
  import ChatServices from '@services/chat.services';
  import Loading from '@components/Loading.svelte';
  import { applyAction, enhance } from '$app/forms';
  import type { Limit } from '@models/Limit';
  import { disconnect, INPUT } from '$lib/utils.js';
  import ChatCard from '@components/ChatCard.svelte';
  import GroupCard from '@components/GroupCard.svelte';
  import { page } from '$app/stores';
  import type { FormResponse } from '@models/AuthResponse';
  import { onMount } from 'svelte';
  import socket from '$lib/socket/webSocketClient';
  import Signout from '@components/Signout.svelte';

  const RATIO = 11;

  export let form: FormResponse;
  export let data: {
    groups: Group[]
    message?: string
    groupIn?: string
  };

  let limit: Limit<number> = {
    start: 0,
    end: RATIO
  };

  let value = '';
  let messages: Message[] = [];

  let isLoading = !!data.groupIn;
  let haveMoreChat = true;
  let isInView = false;
  let groupId = $page.url.searchParams.get('groupId');

  onMount(() => {
    socket.emit('changeRoom', groupId);
  });

  const getMore = async () => {
    if (!haveMoreChat) {
      isInView = false;
      return;
    }
    limit = { start: limit.end, end: limit.end + RATIO };
    try {
      const { data } = await ChatServices.getChats(limit, groupId);
      if (data.length === 0 || data.length < RATIO - 1) haveMoreChat = false;

      messages = [...messages, ...data];
    } catch (e) {
      await disconnect();
    }
    isInView = false;
  };

  const getFirstChatsOfGroup = async () => {
    limit = { start: 0, end: RATIO };
    const response = await ChatServices.getChats(limit, groupId)
      .catch(null);

    if (!response) {
      await disconnect();
    }

    messages = response.data;
  };

  $: {
    groupId = $page.url.searchParams.get('groupId');
    socket.emit('changeRoom', groupId);
    haveMoreChat = true;

    isLoading = true;
    const response = getFirstChatsOfGroup()
      .catch(() => {return;});

    if (!response) disconnect();
    isLoading = false;
  }

  const handleGroupClick = (e: CustomEvent<string>) => {
    data.groupIn = e.detail;
    isLoading = true;
  };

  const handleSubmit = () => {
    isLoading = true;
    return async ({ result }) => {
      await applyAction(result);
      value = '';
    };
  };

  socket.on('newChat', (chat: Message) => {
    messages = [chat, ...messages];
    isLoading = false;
  });
</script>

<div class='justify-center items-center flex w-screen h-screen p-20 gap-4'>
  <div class='w-full flex h-96 overflow-y-auto w-[22%] border-[1.5px] border-white rounded-lg flex-col items-center'>
    {#each data.groups as group}
      <GroupCard
        group={group}
        on:click={handleGroupClick}
      />
    {/each}
  </div>
  <div
    class='relative w-full flex justify-between h-96 lg:w-[40%] w-full border-[1.5px] border-white rounded-lg flex-col items-center'>
    {#if isLoading}
      <Loading absolute />
    {/if}
    {#if groupId === null}
      <span class="text-white my-auto">{data?.message}</span>
    {:else}
      <ul class='ti-anchor w-full overflow-y-auto flex flex-col-reverse'>
        {#each messages as message, i}
          <ChatCard isLast={i === messages.length - 1} message={message} getMore={getMore} />
        {/each}
      </ul>
    {/if}
    {#if (data.groupIn)}
      <form
        class='w-full flex justify-center items-center'
        enctype='multipart/form-data'
        method='post'
        use:enhance={handleSubmit}
      >
        <TextInput bind:value error={form?.internalError ?? ""} name={INPUT.MESSAGE}
                   placeholder={groupId ? `Send message in ${data.groupIn}...` : "You can not send message here"} />
        <div class='flex justify-center items-center'>
          <button class='w-fit absolute flex justify-end mr-5 items-center mr-16' disabled={groupId === null}
                  type='submit'>
            <SendIcon />
          </button>
        </div>
      </form>
    {/if}
  </div>
</div>
<Signout />