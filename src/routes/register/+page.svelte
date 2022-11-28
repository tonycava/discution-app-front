<script lang="ts">
  import TextInput from '@components/form/TextInput.svelte';

  let username = "";
  let usernameError = "";

  let password = "";
  let passwordError = "";

  let internalError = "";

  const handleSubmitForNewProject = (e: SubmitEvent) => {
    e.preventDefault();
  };

</script>

<header class="absolute m-6 flex justify-center items-center gap-4">
  <img alt="Koomei logo" class="flex justify-center w-12 mx-auto aspect-square"
       src="/logo.png">

  <span class="h-8 text-white text-2xl my-4 text-center w-full"
        style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">To cat from chat</span>
</header>

<div class="absolute mb-32 isolate justify-center items-center flex flex-col w-screen h-screen">

   <span
     class="h-8 relative text-3xl my-4 text-center w-full flex justify-center items-end before:-bottom-3 text-white before:absolute before:content-[''] before:w-32 before:h-1 before:bg-white"
     style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">Register</span>

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

    <a class="text-white" href="/login">Have an account ? <strong>Log in</strong></a>
    <span class="font-bold text-red-600">{internalError}</span>
    <button class="isolate bg-gray-800 py-3 px-8 rounded-3xl w-fit mx-auto text-white mt-6" type="submit">
      Let's Chat
    </button>
  </form>
</div>

