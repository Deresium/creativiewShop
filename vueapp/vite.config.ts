import {defineConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 8080,
        host: 'ribrashopdev.be'
    },
    build: {
        outDir: '../public/vueapp',
        rollupOptions: {
            input: {
                2: resolve(__dirname, 'customer/2/index.html')
            }
        }
    }
})
