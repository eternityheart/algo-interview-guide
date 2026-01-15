import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
// 暂时移除 runtimePlugin，因为它导致了导入错误
// import runtimePlugin from "vite-plugin-manus-runtime";

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  // runtimePlugin()
];

// 根据部署环境选择 base 路径
// GitHub Pages 需要 /algo-interview-guide/，Vercel 使用 /
const getBase = () => {
  if (process.env.VERCEL) return '/';
  if (process.env.GITHUB_ACTIONS) return '/algo-interview-guide/';
  return '/';
};

export default defineConfig({
  base: getBase(),
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),

  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    }
  },
});
