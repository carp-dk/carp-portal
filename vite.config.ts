import react from '@vitejs/plugin-react';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from './package.json';

const path = require('node:path');
const version = pkg.version;

export default async ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const { visualizer } = await import('rollup-plugin-visualizer');

  return defineConfig({
    build: {
      // Relative to the root
      outDir: '../build',
      assetsDir: '',
      // The vendored @cachet carp.core (Kotlin/JS) uses kotlinx.serialization,
      // which resolves serializers via class/function names at runtime. The
      // default (rolldown) minifier — like terser without these flags — renames
      // them, so Json.decodeFromString throws ("cannot read properties of
      // undefined") in production and every core-backed query errors (blank
      // study pages). Use terser and keep class/function names.
      minify: 'terser',
      terserOptions: {
        compress: { keep_classnames: true, keep_fnames: true },
        mangle: { keep_classnames: true, keep_fnames: true },
      },
      rollupOptions: {
        onwarn: (warning, warn) => {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          warn(warning);
        },
        // The vendored @cachet carp.core (Kotlin/JS) exposes its public JS API
        // via prototype extensions applied as module-load side effects (e.g.
        // Instant.toEpochMilliseconds, KtSet.toArray/size). rolldown (vite 8.1.x,
        // used by both the pnpm and bun toolchains here) tree-shakes these
        // statements in production, leaving the methods undefined at runtime.
        // Keep @cachet modules intact so the extensions survive.
        treeshake: {
          moduleSideEffects: (id) =>
            id.includes('/@cachet/') ? true : undefined,
        },
        // output: {
        //   // Efficient chunk splitting
        //   manualChunks: {
        //     "react-vendor": ["react", "react-dom"],
        //     "router-vendor": ["react-router-dom"],
        //     "ui-vendor": ["@mui/material", "@mui/icons-material"],
        //     "utils-vendor": ["date-fns"],
        //   },

        //   // Optimized file naming
        //   chunkFileNames: "js/[name]-[hash].js",
        //   entryFileNames: "js/[name]-[hash].js",
        //   assetFileNames: (assetInfo) => {
        //     const info = assetInfo.name.split(".");
        //     const ext = info[info.length - 1];
        //     if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
        //       return `images/[name]-[hash].[ext]`;
        //     }
        //     return `assets/[name]-[hash].[ext]`;
        //   },
        // },

        // Advanced tree shaking
        //     treeshake: {
        //       moduleSideEffects: false,
        //       propertyReadSideEffects: false,
        //     },
      },
      //   cssCodeSplit: true,
    },

    // optimizeDeps: {
    //   include: ["react", "react-dom", "react-router-dom"],
    //   exclude: ["@mui/icons-material"],
    // },

    server: {
      // hmr: true,
      port: 3000,
      proxy: {
        '/proxy': {
          target: 'https://dev.carp.dk',
          // target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/proxy/, ''),
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        },
      },
    },
    resolve: {
      tsconfigPaths: true,
      alias: {
        '@Assets': path.resolve(__dirname, './src/assets'),
        '@Components': path.resolve(__dirname, './src/components'),
        '@Modules': path.resolve(__dirname, './src/components/modules'),
        '@Utils': path.resolve(__dirname, './src/utils'),
      },
    },
    plugins: [
      codeInspectorPlugin({ bundler: 'vite' }),
      react({
        include: '**/*.{jsx,tsx}',
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title:
              process.env.NODE_ENV === 'production'
                ? 'Copenhagen Research Platform'
                : `🛠️ Copenhagen Research Platform`,
            version: version,
          },
        },
      }),
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    base: process.env.VITE_BASE_NAME,
  });
};
