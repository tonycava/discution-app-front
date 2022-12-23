<script lang="ts">
  import TextInput from '@components/form/TextInput.svelte';
  import Loading from '@components/Loading.svelte';
  import { onMount } from "svelte";
  import { applyAction, enhance } from "$app/forms";
  import { user } from '$lib/stores/user.stores';
  import { goto } from '$app/navigation';
  import type { AuthError } from '@models/AuthResponse';

  export let form: AuthError
  let isLoading = false;

  onMount(async () => {
    if (!$user) await goto("/");
  });

  const handleSubmit = async () => {
    isLoading = true;
    return async ({ result }) => {
      await applyAction(result);
      isLoading = false;
    };
  };
</script>

{#if isLoading}
  <Loading/>
{/if}

<div class="justify-center items-center flex flex-col w-screen h-screen">
   <span
     class="h-8 relative text-3xl my-4 text-center w-full flex justify-center items-end before:-bottom-3 text-white before:absolute before:content-[''] before:w-32 before:h-1 before:bg-white"
     style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">Login</span>

  <form
    action="?/login"
    class="mt-12 flex flex-col justify-center lg:w-1/4 w-3/4 mx-auto [&>input]:w-full"
    enctype="multipart/form-data"
    method="post"
    use:enhance={handleSubmit}
  >

    <TextInput
      error={form?.usernameError ?? ""}
      name="username"
      type="text"
      placeholder="Username"
    />

    <TextInput
      error={form?.passwordError ?? ""}
      name="password"
      type="password"
      placeholder="Password"
    />

    <a class="text-white" href="/register">Don't have an account ? <strong>Create One</strong></a>
    <span class="font-bold text-red-600">{form?.internalError ?? ""}</span>
    <button class="isolate bg-gray-800 py-3 px-8 rounded-3xl w-fit mx-auto text-white mt-6" type="submit">
      Let's Chat
    </button>
  </form>
</div>