import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

const path = require("path");

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      // Relative to the root
      outDir: "../build",
      assetsDir: "",
      rollupOptions: {
        onwarn: (warning, warn) => {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          warn(warning);
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
        "/proxy": {
          target: "https://dev.carp.dk",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/proxy/, ""),
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      },
    },
    resolve: {
      alias: {
        "@Assets": path.resolve(__dirname, "./src/assets"),
        "@Components": path.resolve(__dirname, "./src/components"),
        "@Modules": path.resolve(__dirname, "./src/components/modules"),
        "@Utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    plugins: [
      react({
        include: "**/*.{jsx,tsx}",
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title:
              process.env.NODE_ENV === "production"
                ? "Copenhagen Research Platform"
                : `🛠️ Copenhagen Research Platform`,
          },
        },
      }),
      viteTsconfigPaths(),
      visualizer({
        filename: "dist/stats.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    base: process.env.VITE_BASE_NAME,
  });
};
