import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  css: {
    postcss: './postcss.config.js', // Ensure PostCSS config is linked
  },
});
