<script lang='ts'>
  import TextInput from '@components/form/TextInput.svelte';
  import { onMount } from 'svelte';
  import { applyAction, enhance } from '$app/forms';
  import { user } from '$lib/stores/user.stores';
  import { goto } from '$app/navigation';
  import type { AuthError } from '@models/AuthResponse';

  export let form: AuthError;
  let isLoading = false;

  onMount(async () => {
    if (!$user) await goto('/');
  });

  const handleSubmit = async () => {
    isLoading = true;
    return async ({ result }) => {
      await applyAction(result);
      isLoading = true;
    };
  };

</script>


<div class='isolate justify-center items-center flex flex-col w-screen h-full'>
   <span
		 class="h-8 relative text-3xl my-4 text-center w-full flex justify-center items-end before:-bottom-3 text-white before:absolute before:content-[''] before:w-32 before:h-1 before:bg-white"
		 style='font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif'>Register</span>

	<form
		action='?/register'
		class='mt-12 flex flex-col justify-center lg:w-1/4 w-3/4 mx-auto [&>input]:w-full'
		enctype='multipart/form-data'
		method='post'
		use:enhance={handleSubmit}
	>

		<TextInput
			error={form?.usernameError ?? ""}
			name='username'
			placeholder='Username'
		/>

		<TextInput
			error={form?.passwordError ?? ""}
			name='password'
			placeholder='Password'
		/>

		<a class='text-white' href='/login'>Have an account ? <strong>Log in</strong></a>
		<span class='font-bold text-red-600'>{form?.internalError ?? ""}</span>
		<button class='isolate bg-gray-800 py-3 px-8 rounded-3xl w-fit mx-auto text-white mt-6' type='submit'>
			Let's Chat
		</button>
	</form>
</div>

