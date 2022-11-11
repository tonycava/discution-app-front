<script lang="ts">
  import socket from '../lib/socket/webSocketClient';
  import type { Message } from "@types/Message";

  let text = '';
  let messages: Message[] = [];

  function sendMessage(){
    const message = text.trim();
    if (!message) return;
    text = '';
    socket.emit('message', { message, userId: 2 });
  }

  socket.on("newChat", (chat: Message) => {
    messages = [chat, ...messages];
  });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<input bind:value={text}>
<button on:click={sendMessage}>Send</button>

{#each messages as message}
  <p>{message.message}</p>
{/each}
