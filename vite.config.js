import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        products: resolve(__dirname, 'products.html'),
        whyShees: resolve(__dirname, 'why-shees.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        faqs: resolve(__dirname, 'faqs.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
