<script lang="ts">
  import TextInput from '@components/form/TextInput.svelte';
  import Loading from '@components/Loading.svelte';
  import { applyAction, enhance } from '$app/forms';
  import type { FormResponse } from '@models/AuthResponse';
  import { INPUT } from '$lib/utils.js';

  export let form: FormResponse;
  let isLoading = false;

  const handleSubmit = async () => {
    isLoading = true;
    return async ({ result }) => {
      await applyAction(result);
      isLoading = false;
    };
  };
</script>


<div class="justify-center items-center flex flex-col w-screen h-screen">
   <span
     class="h-8 relative text-3xl text-center w-full flex justify-center items-end before:-bottom-3 text-white before:absolute before:content-[''] before:w-32 before:h-1 before:bg-white"
     style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">Login</span>
  {#if isLoading}
    <Loading absolute />
  {/if}
  <form
    action="?/login"
    class="mt-12 flex gap-5 flex-col justify-center lg:w-1/4 w-3/4 mx-auto [&>input]:w-full"
    enctype="multipart/form-data"
    method="post"
    use:enhance={handleSubmit}
  >

    <TextInput
      name={INPUT.USERNAME}
      placeholder="Username"
      type="text"
    />
    <TextInput
      name={INPUT.PASSWORD}
      placeholder="Password"
      type="password"
    />
    <div class="w-full relative flex justify-center items-center">

      <button class="relative bg-gray-800 py-3 px-8 rounded-3xl w-fit w-full text-white" type="submit">
        Let's Chat
      </button>
      <span
        class="font-bold text-red-600 absolute left-1/2 -translate-x-1/2 -bottom-5 break-normal"
      >
        {form?.internalError ?? ""}
      </span>
    </div>
  </form>
</div>
<a class="text-white absolute bottom-0 p-2" href="/register">Don't have an account ? <strong>Create One</strong></a>