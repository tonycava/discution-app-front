<script lang="ts">
  import socket from '$lib/socket/webSocketClient';
  import type { Message } from "@types/Message";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Cookies from "js-cookie";
  import { user } from "$lib/stores/user.store";
  import TextInput from "@components/form/TextInput.svelte";
  import z from "zod";
  import SendIcon from "@components/SendIcon.svelte";

  const validationSchema = z.string().min(1, { message: "Message can not be empty" });

  let text = '';

  let messages: Message[] = [{
    message: 'Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!',
    userId: "system",
  },
    {
      message: 'Please enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your namePlease enter your name',
      userId: "84d36e1a-2bae-451e-a5ef-2650093c1c3d",
    },    {
      message: 'Please enter your name',
      userId: "84d36e1a-2bae-451e-a5ef-2650093c1c3d",
    },    {
      message: 'Please enter your name',
      userId: "84d36e1a-2bae-451e-a5ef-2650093c1c3d",
    },    {
      message: 'Please enter your name',
      userId: "84d36e1a-2bae-451e-a5ef-2650093c1c3d",
    },    {
      message: 'Please enter your name',
      userId: "84d36e1a-2bae-451e-a5ef-2650093c1c3d",
    },  {
      message: 'Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!Welcome to the cha!',
      userId: "system",
    },  {
      message: 'Please enter your name',
      userId: "84d36e1a-2bae-451e-a5ef-2650093c1c3d",
    },    {
      message: 'Please enter your nameggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      userId: "84d36e1a-2bae-451e-a5ef-2650093c1c3d",
    },
    ];

  function sendMessage() {
    const message = text.trim();
    if (!message) return;
    text = '';
    socket.emit('message', { message, userId: $user?.userId });
  }

  onMount(() => {
    if (!Cookies.get('user')) return goto("/login");
  });

  socket.on("newChat", (chat: Message) => {
    messages = [chat, ...messages];
  });
</script>

<div class="justify-center items-center flex flex-col w-screen h-screen">
  <div class="w-full flex justify-center h-96 w-[28%] border-[1.5px] border-white rounded-lg flex-col items-center">
    <ul class="w-full overflow-y-scroll grid grid-cols-2 flex-col-reverse">
      {#each messages as message}
        {#if (message.userId === $user?.userId)}
          <li style="overflow-wrap: break-word;" class="bg-red-500 text-white col-start-2 mt-2">{message.message}</li>
        {:else}
          <li style="overflow-wrap: break-word;" class="bg-blue-500 text-white col-start-1 w-[calc(50%-25px)] col-end-3 ml-2 mt-2">{message.message}</li>
        {/if}
      {/each}
    </ul>
    <div class="w-full flex justify-center items-center mt-auto">
      <TextInput bind:value={text} error="Message can not be empty" placeholder="Message"/>
      <div class="absolute w-[28%] flex justify-center items-center">
        <div class="w-full -z-10 absolute mt-1 flex justify-end mr-5 items-center">
          <SendIcon/>
        </div>
      </div>
    </div>
  </div>
</div>
