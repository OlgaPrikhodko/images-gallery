import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const cherryPickedKeys = ["NODE_ENV", "FAST_REFRESH", "REACT_APP_UNSPLASH_KEY"];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    plugins: [react(), svgr()],
  };
});
