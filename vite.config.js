import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Stable (non-hashed) filenames. Without this, committed prerendered
    // snapshots (public/<route>/index.html — see scripts/prerender.mjs)
    // would reference a specific build's hashed asset filenames and silently
    // break the next time any file changes and the build output is
    // regenerated without re-running the prerender step.
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
})
