import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from 'node:path'
import plainText from 'vite-plugin-plain-text'

export default defineConfig({
    root: path.resolve(__dirname, 'src/web'),
    base: '/mog/',

    server: {
        port: 8080,
    },

    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "sass:color"; @use "sass:math";',
            },
        },
    },

    plugins: [
        plainText([
            /\.csv$/,
        ], {
            namedExport: false,
        }),

        vue({
            template: { transformAssetUrls },
        }),

        quasar({
            sassVariables: path.resolve(__dirname, 'src/web/client/assets/css/variables.scss'),
        }),
    ],
})
