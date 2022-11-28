<script lang="ts">
  import socket from '$lib/socket/webSocketClient';
  import type { Message } from "@types/Message";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Cookies from "js-cookie";

  let text = '';
  let uuid = '';
  let messages: Message[] = [];

  function sendMessage() {
    const message = text.trim();
    if (!message) return;
    text = '';
    socket.emit('message', { message, userId: uuid });
  }

  onMount(() => {
    if (!Cookies.get('user')) return goto("/login");
  });

  socket.on("newChat", (chat: Message) => {
    messages = [chat, ...messages];
  });
</script>

<h1 class="text-white">Welcome to SvelteKit</h1>
<p class="text-white">Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<input bind:value={text}>
<input bind:value={uuid}>

<button class="text-white" on:click={sendMessage}>Send</button>

{#each messages as message}
  <p class="text-clip">{message.message}</p>
{/each}
