import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import path from "path";

const config: UserConfig = {
  envDir: './',
  plugins: [sveltekit()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@components': path.resolve('./src/components'),
      '@types': path.resolve('./src/types'),
      '@services': path.resolve('./src/services'),
      '@stores': path.resolve('./src/stores'),
    }
  }
};

export default config;
