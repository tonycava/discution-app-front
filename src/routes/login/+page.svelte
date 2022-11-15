<script lang="ts">
  import TextInput from '../../components/TextInput.svelte';
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { Mesh, MeshBasicMaterial, TetrahedronGeometry } from 'three';
  import randomColor from "randomcolor";
  import converter from "hex2dec";

  let username = "";
  let handleSubmitForNewProject = () => {
    console.log(username);
  };

  let canvas;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setZ(5)
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const geometry = new THREE.TetrahedronGeometry();

    const cubes: Mesh<TetrahedronGeometry, MeshBasicMaterial>[] = [];

    for (let i = 0; i < 6000; i ++) {
      const colorInHex = randomColor() as string;
      const colorInDec = converter.hexToDec(colorInHex.replace("#", "0x"));
      const material = new THREE.MeshBasicMaterial({ color: + colorInDec })

      const cube = new THREE.Mesh(geometry, material);
      const pos = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 150
      );
      cube.position.set(pos.x, pos.y, pos.z);
      cubes.push(cube);
      scene.add(cube);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((cube) => {
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
      });
      renderer.render(scene, camera);
    };

    const resize = () => {
      renderer.setSize(window.innerWidth - 10, window.innerHeight - 5);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    console.log(username);
  };

  let usernameError = "";
</script>

<canvas bind:this={canvas} class="absolute"></canvas>

<div class="absolute mb-32 isolate justify-center items-center flex flex-col w-screen h-screen">
  <header class="flex flex-col justify-center mx-auto [&>input]:w-full">
    <img alt="Koomei logo" class="flex justify-center w-24 mx-auto aspect-square"
         src="/logo.png">

    <span class="h-8 text-white leading-9 text-5xl my-4 text-center w-full"
          style="font-family: Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif">To cat from chat</span>
  </header>

  <form class="mt-12 flex flex-col justify-center lg:w-1/4 w-3/4 mx-auto [&>input]:w-full"
        on:submit={handleSubmitForNewProject}>

    <TextInput
      bind:value={username}
      field="Username :"
      placeholder="Username"
    />
    <span class="font-bold text-red-600">{usernameError}</span>

    <TextInput
      bind:value={username}
      field="Password :"
      placeholder="Password"
    />
    <span class="font-bold text-red-600">{usernameError}</span>

    <button class="isolate bg-gray-800 py-3 px-8 rounded-3xl w-fit mx-auto text-white mt-6" type="submit">Let's Chat
    </button>
  </form>
</div>

