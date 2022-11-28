<script lang="ts">
  import '../styles/app.css';
  import { onMount } from 'svelte';
  import { createScene, resize } from '$lib/backgroundScene.js';
  import { axiosInterceptor } from "$lib/axios";
  import { user } from "$lib/stores/user.store";
  import Cookies from "js-cookie";
  import type { User } from "../types/User";


  let canvas: HTMLCanvasElement;

  onMount(() => {
    const UserData: User | null = JSON.parse(Cookies.get("user") ?? '{}');
    user.set(UserData);
    axiosInterceptor($user.userId);

    createScene(window, canvas);
    window.addEventListener('resize', resize);
  });
</script>

<div class="relative min-h-screen">
  <canvas bind:this={canvas} class="absolute"></canvas>
  <slot/>
</div>