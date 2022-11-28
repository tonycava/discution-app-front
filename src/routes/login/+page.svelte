<script lang="ts">
  import TextInput from '@components/form/TextInput.svelte';
  import Loading from '@components/Loading.svelte';
  import LoginServices from "@services/login.services";
  import type { User } from "@types/User";
  import { goto } from "$app/navigation";
  import Cookies from "js-cookie";
  import z from "zod";
  import { axiosInterceptor } from "$lib/axios";
  import { onMount } from "svelte";
  import { user } from "$lib/stores/user.store";

  const validationSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  let username = "";
  let usernameError = "";

  let password = "";
  let passwordError = "";

  let internalError = "";
  let isLoading = false;

  onMount(() => {
    if (!$user) goto("/");
  });

  const handleSubmit = async () => {
    isLoading = true;
    const results = validationSchema.safeParse({ username, password });

    if (!results.success) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const error = results.error.format();
      passwordError = error.password?._errors.join(", ") ?? "";
      usernameError = error.username?._errors.join(", ") ?? "";
      isLoading = false;
      return;
    }

    try {
      const { data } = await LoginServices.login({ username, password });
      axiosInterceptor(data.access_token);
      const { data: userResponse } = await LoginServices.getUser();

      const userData: User = {
        userId: userResponse.id,
        username: userResponse.username,
        createdAt: userResponse.createdAt,
        access_token: data.access_token,
      };

      Cookies.set('user', JSON.stringify(userData));
      await goto("/");
    } catch ({ response }) {
      internalError = response.data.message;
    }
    isLoading = false;
  };
</script>

{#if isLoading}
  <Loading/>
{/if}

<header class="absolute m-6 flex justify-center items-center gap-4">
  <img alt="Koomei logo" class="flex justify-center w-12 mx-auto aspect-square"
       src="/logo.png">
  <span class="h-8 text-white text-2xl my-4 text-center w-full"
        style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">To cat from chat</span>
</header>

<div class="absolute mb-32 isolate justify-center items-center flex flex-col w-screen h-screen">
   <span
     class="h-8 relative text-3xl my-4 text-center w-full flex justify-center items-end before:-bottom-3 text-white before:absolute before:content-[''] before:w-32 before:h-1 before:bg-white"
     style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">Login</span>

  <form class="mt-12 flex flex-col justify-center lg:w-1/4 w-3/4 mx-auto [&>input]:w-full"
        on:submit|preventDefault={handleSubmit}
  >

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

    <a class="text-white" href="/register">Don't have an account ? <strong>Create One</strong></a>
    <span class="font-bold text-red-600">{internalError}</span>
    <button class="isolate bg-gray-800 py-3 px-8 rounded-3xl w-fit mx-auto text-white mt-6" type="submit">
      Let's Chat
    </button>
  </form>
</div>
