<script lang="ts">
  import TextInput from '@components/form/TextInput.svelte';
  import { onMount } from 'svelte';
  import { createScene, resize } from "$lib/backgroundScene";
  import LoginServices from "@services/login.services";
  import StatusCode from "status-code-enum";

  let canvas: HTMLCanvasElement;

  let username = "";
  let usernameError = "";

  let password = "";
  let passwordError = "";

  let internalError = ""

  const handleSubmitForNewProject = (e: SubmitEvent) => {
    e.preventDefault()

    LoginServices
      .login(username, password)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(({ response }) => {
        if (response.status === StatusCode.ClientErrorBadRequest) {
          internalError = "Invalid username or password"
          return
        }
        internalError = "An unknown error occurred"
      })
  };

  onMount(() => {
    createScene(window, canvas);
    window.addEventListener('resize', resize);
  });

</script>

<canvas bind:this={canvas} class="absolute"></canvas>

<div class="absolute mb-32 isolate justify-center items-center flex flex-col w-screen h-screen">
  <header class="flex flex-col justify-center mx-auto [&>input]:w-full">
    <img alt="Koomei logo" class="flex justify-center w-24 mx-auto aspect-square"
         src="/logo.png">

    <span class="h-8 text-white leading-9 text-5xl my-4 text-center w-full"
          style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">To cat from chat</span>
  </header>

  <form class="mt-12 flex flex-col justify-center lg:w-1/4 w-3/4 mx-auto [&>input]:w-full"
        on:submit={handleSubmitForNewProject}>

    <TextInput
      bind:value={username}
      error={usernameError}
      placeholder="Username"
    />

    <TextInput
      bind:value={password}
      error={passwordError}
      placeholder="Password"
    />

    <span class="font-bold text-red-600">{internalError}</span>
    <button class="isolate bg-gray-800 py-3 px-8 rounded-3xl w-fit mx-auto text-white mt-6" type="submit">
      Let's Chat
    </button>
  </form>
</div>

