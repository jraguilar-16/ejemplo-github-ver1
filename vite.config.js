import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/ejemplo-github-ver1/" : "/",
  server: {
    host: true,
    allowedHosts: true,
    strictPort: false,
  },
});