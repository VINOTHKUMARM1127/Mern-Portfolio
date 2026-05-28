import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const projectId = env.VITE_SANITY_PROJECT_ID;

  const sanityProxy =
    projectId && projectId !== "your_project_id"
      ? {
          "/sanity": {
            target: `https://${projectId}.apicdn.sanity.io`,
            changeOrigin: true,
            secure: true,
            rewrite: (path) => path.replace(/^\/sanity/, ""),
          },
        }
      : {};

  return {
    plugins: [react()],
    server: {
      proxy: sanityProxy,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three"],
            r3f: ["@react-three/fiber", "@react-three/drei"],
            gsap: ["gsap"],
            sanity: ["@sanity/client", "@sanity/image-url"],
            motion: ["framer-motion"],
          },
        },
      },
    },
  };
});
