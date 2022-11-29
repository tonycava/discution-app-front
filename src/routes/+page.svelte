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
    message: 'Welcome to the chat!',
    userId: "system",
  },
    {
      message: 'Please enter your name',
      userId: "84d36e1a-2bae-451e-a5ef-2650093c1c3d",
    }];

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

  <div class="w-full flex justify-center flex-col items-center">
    <div class="w-[28%] bg-red-500">
      {#each messages as message}
        <p class="text-white">{message.message}</p>
      {/each}
    </div>

    <div class="pt-16 w-[28%] flex justify-center items-center">
      <TextInput bind:value={text} error="Message can not be empty" placeholder="Message"/>
      <div class="absolute w-full flex justify-center items-center">
        <div class="w-[28%] mt-1 flex justify-end mr-5 items-center">
          <SendIcon/>
        </div>
      </div>
    </div>
  </div>

</div>
