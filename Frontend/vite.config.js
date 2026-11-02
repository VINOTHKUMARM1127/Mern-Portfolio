import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Helper to inject .env.local and .env files directly into process.env for Node dev middleware
function injectLocalEnv(dir) {
  const envFiles = [".env", ".env.local"];
  for (const file of envFiles) {
    const fullPath = path.resolve(dir, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, "");
          process.env[key] = val;
        }
      }
    }
  }
}

// Lightweight local development proxy/handler for /api/submit-review
function devApiPlugin() {
  return {
    name: "dev-api-plugin",
    configureServer(server) {
      server.middlewares.use("/api/submit-review", async (req, res, next) => {
        if (req.method !== "POST") return next();

        try {
          // Ensure environment variables from .env.local and .env are loaded into process.env
          injectLocalEnv(process.cwd());

          const chunks = [];
          for await (const chunk of req) {
            chunks.push(chunk);
          }
          const raw = Buffer.concat(chunks).toString("utf-8");
          let body = {};
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch {
            body = {};
          }

          const { default: handler } = await import("./api/submit-review.js");

          const mockRes = {
            statusCode: 200,
            setHeader(name, val) {
              res.setHeader(name, val);
            },
            status(code) {
              this.statusCode = code;
              return this;
            },
            json(data) {
              res.statusCode = this.statusCode;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            },
          };

          const mockReq = {
            method: req.method,
            headers: req.headers,
            socket: req.socket,
            body,
          };

          await handler(mockReq, mockRes);
        } catch (err) {
          console.error("[dev-api-plugin] Handler error:", err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  injectLocalEnv(process.cwd());
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, val] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }

  const projectId = env.VITE_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;

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
    plugins: [react(), devApiPlugin()],
    server: {
      proxy: sanityProxy,
      watch: {
        ignored: ["**/*.zip", "**/node_modules/**", "**/.git/**"],
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three"],
            r3f: ["@react-three/fiber", "@react-three/drei"],
            gsap: ["gsap"],
            sanity: ["@sanity/client", "@sanity/image-url"],
            motion: ["framer-motion"],
            icons: ["react-icons", "lucide-react"],
          },
        },
      },
      chunkSizeWarningLimit: 250,
    },
  };
});
