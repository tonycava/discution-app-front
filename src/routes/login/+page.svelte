<script lang="ts">
  import TextInput from '../../components/TextInput.svelte';

  let username = "";
  let handleSubmitForNewProject = () => {
    console.log(username);
  };
  let usernameError = "";
</script>


<form class="flex flex-col justify-center w-1/3 mx-auto h-screen [&>input]:w-full" on:submit={handleSubmitForNewProject}>
  <TextInput
    bind:value={username}
    placeholder="Enter your username"
  />
  <span class="font-bold text-red-600">{usernameError}</span>
</form>
