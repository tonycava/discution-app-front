<script lang="ts">
  import '../styles/app.css';
  import { onMount } from 'svelte';
  import { createScene, resize } from '$lib/backgroundScene.js';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    createScene(window, canvas);
    window.addEventListener('resize', resize);
  });
</script>

<div class="relative min-h-screen">
  <canvas bind:this={canvas} class="absolute"></canvas>
  <slot/>
</div>