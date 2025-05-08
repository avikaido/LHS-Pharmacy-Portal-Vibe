import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: await fs.readFile(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },

  server: {
    proxy: {
      // Route all internal API calls to your Express backend
      '^/api/(?!nhs).*': {  // Exclude NHS API calls from going to Express
        target: 'http://localhost:5002', // Express API backend
        changeOrigin: true,
        rewrite: (path) => path, // Keeps the API paths intact
      },

      // NIH API Proxy (Ensures only NIH API calls are forwarded externally)
      '^/api/nhs/.*': {
        target: 'https://npiregistry.cms.hhs.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/nhs/, '/api'), // Ensure path matches NHS API expectations
        secure: false,
      },
    },
  },

  plugins: [svgr(), react()],
});
