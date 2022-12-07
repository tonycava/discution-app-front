<script lang='ts'>
  import '../styles/app.css';
  import { onMount } from 'svelte';
  import { createScene, resize } from '$lib/backgroundScene.js';
  import Navbar from '@components/Navbar.svelte';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    createScene(window, canvas);
    window.addEventListener('resize', resize);
  });
</script>

<main class='min-h-screen'>
	<canvas bind:this={canvas} class='absolute'></canvas>
	<div class='relative z-10'>
		<Navbar />
		<slot />
	</div>
</main>