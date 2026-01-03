
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  server: {
    port: 4200, // ফ্রন্টএন্ড এই পোর্টে চলবে
    open: true,
    // CORS সমস্যা এড়ানোর জন্য ব্যাকএন্ডে প্রক্সি করা হচ্ছে
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // আপনার ব্যাকএন্ডের ঠিকানা
        changeOrigin: true,
      },
    },
  },
});
