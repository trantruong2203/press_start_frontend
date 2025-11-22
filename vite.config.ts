import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true,          // Cho phép truy cập từ mạng bên ngoài (LAN + ngrok)
    port: 5173,          // Cố định cổng để ngrok trỏ đến
    strictPort: true,    // Nếu port bận -> báo lỗi, không tự đổi port
    allowedHosts: [
      'unliberal-astonishingly-karri.ngrok-free.dev' // thêm host của ngrok
    ],
  },
})
