import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

const isDev = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "import.meta.env.VITE_MODULE_VERSION": JSON.stringify(
      process.env.VITE_MODULE_VERSION
    ),
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        images: resolve(__dirname, "src/assets/entry.ts"),
      },
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.type === "asset" &&
            /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name!)
          ) {
            return "static/img/[name].[ext]";
          }
          if (
            assetInfo.type === "asset" &&
            /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name!)
          ) {
            return "static/fonts/[name].[hash][ext]";
          }
          return "static/[ext]/name1-[hash].[ext]";
        },
      },
    },
    assetsInlineLimit: 1,
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api/graphs": {
        target: isDev ? "http://116.62.110.113:8000/" : "https://osgraph.com",
        changeOrigin: isDev,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
