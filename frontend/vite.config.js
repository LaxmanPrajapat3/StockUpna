import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   theme: {
    extend: {},
  },
  plugins: [react()],
  corePlugins: {
    // make sure these are enabled
    transform: true,
    transitionProperty: true,
  },
})
