<script lang="ts">
  import TextInput from '@components/form/TextInput.svelte';
  import { onMount } from "svelte";
  import { user } from "$lib/stores/user.store";
  import { goto } from "$app/navigation";
  import { axiosInterceptor } from "$lib/axios";
  import UserServices from "@services/user.services";
  import Cookies from "js-cookie";
  import type { User } from "@types/User";
  import { authZodSchema } from "$lib/zod";
  import RegisterServices from "../../services/register.services";

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
    const results = authZodSchema.safeParse({ username, password });

    if (!results.success) {
      const error = results.error.format();
      passwordError = error.password?._errors.join(", ") ?? "";
      usernameError = error.username?._errors.join(", ") ?? "";
      isLoading = false;
      return;
    }

    try {
      const { data } = await RegisterServices.register({ username, password });
      axiosInterceptor(data.access_token);
      const { data: userResponse } = await UserServices.getUser();

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


<div class="isolate justify-center items-center flex flex-col w-screen h-full">
   <span
     class="h-8 relative text-3xl my-4 text-center w-full flex justify-center items-end before:-bottom-3 text-white before:absolute before:content-[''] before:w-32 before:h-1 before:bg-white"
     style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">Register</span>

  <form class="mt-12 flex flex-col justify-center lg:w-1/4 w-3/4 mx-auto [&>input]:w-full"
        on:submit|preventDefault={handleSubmit}>

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

    <a class="text-white" href="/login">Have an account ? <strong>Log in</strong></a>
    <span class="font-bold text-red-600">{internalError}</span>
    <button class="isolate bg-gray-800 py-3 px-8 rounded-3xl w-fit mx-auto text-white mt-6" type="submit">
      Let's Chat
    </button>
  </form>
</div>

