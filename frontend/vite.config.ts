import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.FRONTEND_PORT || 5173);

  return {
    plugins: [react()],
    server: {
      port,
      proxy: {
        "/api": {
          target: `http://127.0.0.1:${env.FUNCTIONS_PORT || 5001}`,
          changeOrigin: true
        }
      }
    },
    preview: {
      allowedHosts: [
        "stadiumsync-ai-329414830213.us-central1.run.app"
      ]
    }
  };
});
