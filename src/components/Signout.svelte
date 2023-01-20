<script lang="ts">
  import { disconnect } from '$lib/utils';
  import SignoutIcon from '@components/SignoutIcon.svelte';

  const handleClick = async () => {
    await disconnect();
    return;
  };
</script>

<button class="absolute bottom-0 text-white right-0 p-8 flex items-center gap-2 [&>svg]:w-8" on:click={handleClick}>
  <SignoutIcon />
  <span class="text-[1rem]">Sign Out</span>
</button>