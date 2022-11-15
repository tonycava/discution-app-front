import type { Mesh, MeshBasicMaterial, TetrahedronGeometry } from "three";
import * as THREE from "three";
import Color from "color";
import { shadeRGBColor } from "./color";

const scene = new THREE.Scene();
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

export const createScene = (window: Window, canvas: HTMLCanvasElement) => {
  renderer = new THREE.WebGLRenderer({ canvas });
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  camera.position.setZ(5)
  const geometry = new THREE.TetrahedronGeometry();
  const cubes: Mesh<TetrahedronGeometry, MeshBasicMaterial>[] = [];
  
  const [r, g, b] = Color.rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255).array().map(Math.floor);
  const color = `${r},${g},${b}`;
  
  for (let i = 0; i < 3000; i++) {
    const [rr, gg, bb] = shadeRGBColor(color, +Math.random()).split(",");
    
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(+rr, +gg, +bb),
    });
    
    const cube = new THREE.Mesh(geometry, material);
    const pos = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 450
    );
    cube.position.add(pos);
    cubes.push(cube);
  }
  scene.add(...cubes);
  resize()
  animate(cubes)
}

export const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight - 1);
  camera.updateProjectionMatrix();
};

const animate = (cubes: Mesh<TetrahedronGeometry, MeshBasicMaterial>[]) => {
  requestAnimationFrame(() => animate(cubes));
  cubes.forEach((cube) => {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
  });
  camera.rotation.y += 0.002;
  camera.rotation.x += 0.002;
  renderer.render(scene, camera);
};