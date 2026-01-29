import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// @ts-ignore
import DataHub from 'macaca-datahub'
import path from 'node:path'

const datahubConfig = {
  port: 5678, hostname: '127.0.0.1',
  store: './datahub',
  proxy: { '/api': { hub: 'letsdo', }, },
  showBoard: true,
}

const defaultDatahub = new DataHub({ port: datahubConfig.port, })

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'vite-plugin-datahub', configureServer() {
        defaultDatahub.startServer(datahubConfig).then(() => { console.log('datahub ready') })
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `http://${datahubConfig.hostname}:${datahubConfig.port}`,
        changeOrigin: true,
      },
    },
  },
})
