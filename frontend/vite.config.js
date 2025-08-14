import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";
dotenv.config();
// https://vite.dev/config/
export default defineConfig({
   theme: {
    extend: {},
  },
  base:"./",
  plugins: [react()],
  corePlugins: {
    // make sure these are enabled
    transform: true,
    transitionProperty: true,
  },
  server:{
    proxy:{
      '/api':{
        target:process.env.VITE_BACKENDURL,
        changeOrigin:true,
        secure:true
      }
    }
  }

})
