import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or whatever framework you are using
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()], // or other plugins as needed
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'privatekey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certificate.pem')),
    },
    port: 5173, // Make sure this matches your running port
    // Set host to true if you want to expose the server on your network
    host: true,
  },
});
