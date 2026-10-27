import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {developmentAccess} from './dev-access.js';
export default defineConfig({
 plugins:[developmentAccess(),react()],
 server:{port:5173,strictPort:true,proxy:{'/api':'http://127.0.0.1:3001','/login':{target:'http://127.0.0.1:3001',changeOrigin:false},'/auth':{target:'http://127.0.0.1:3001',changeOrigin:false}}},
 build:{target:'es2020',sourcemap:false,chunkSizeWarningLimit:600}
});
