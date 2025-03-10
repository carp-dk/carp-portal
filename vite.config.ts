import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import viteTsconfigPaths from "vite-tsconfig-paths";

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
      },
    },
    server: {
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
    ],
    base: process.env.VITE_BASE_NAME,
  });
};
