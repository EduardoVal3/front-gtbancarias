import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    commonjsOptions: {
      esmExternals: true 
    },
    lib: {
      entry: resolve(__dirname, 'main.js'),
      name: 'DevExtreme React Bundle',
      formats: ['es', 'cjs'],
      fileName: 'devextreme-react-bundle',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
    outDir: 'devextreme-bundle'
  },
})