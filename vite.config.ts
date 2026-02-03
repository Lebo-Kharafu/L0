import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// @ts-ignore //macaca-datahub has no types
import DataHub from 'macaca-datahub'
import path from 'node:path'

const datahubConfig = {
  port: 9200, hostname: '0.0.0.0',
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
        defaultDatahub.startServer(datahubConfig).then(() => { console.log('Datahub ready') })
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: `http://${datahubConfig.hostname}:${datahubConfig.port}/data/letsdo/`,
        changeOrigin: true,
        rewrite: (path:string) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying:', req.method, req.url, '→', `http://${datahubConfig.hostname}:${datahubConfig.port}${proxyReq.path}`);
          });
        },
      },
      
    },
  },
})
