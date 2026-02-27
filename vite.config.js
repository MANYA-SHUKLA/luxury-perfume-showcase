import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)))
const framerMotionPath = path.join(root, 'node_modules', 'framer-motion')

export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: {
      'framer-motion': framerMotionPath,
    },
  },
  optimizeDeps: {
    include: ['framer-motion'],
  },
})
