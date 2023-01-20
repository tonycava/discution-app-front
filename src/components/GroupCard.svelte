<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
  import type { Group } from '@models/User';

  export let group: Group;

  const dispatch = createEventDispatcher();

  const handleGroupClick = () => {
    const previousGroupId = $page.url.searchParams.get('groupId');
    if (group.id === previousGroupId) return;

    dispatch('click', group.name);
    $page.url.searchParams.set('groupId', group.id);
    goto(`?${$page.url.searchParams.toString()}`);
  };
</script>

<div class="w-11/12 mt-2 border-[1.5px] border-white rounded-lg p-2"
     on:click={handleGroupClick}>
  <img alt="default_icon" class="w-10 h-10 rounded-full float-left mr-2" src="/default_icon.png">
  <span class="text-white">{group.name}</span>
</div>