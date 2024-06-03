import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
//import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      /*buffer: 'buffer',
      crypto: 'crypto-browserify',*/
      'chart.js/auto': 'chart.js',
    },
  },
  /*optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },*/
  /*plugins: [
    NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
    NodeModulesPolyfillPlugin(),
  ],
},
  },*/
});
