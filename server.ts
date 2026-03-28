import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Global state for screens (simulating a DB)
  let screenPlaylists: Record<string, any> = {};
  let newsData: any[] = [];

  // API Routes
  app.get("/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV });
  });

  app.get("/api/news", (req, res) => {
    res.json(newsData);
  });

  app.post("/api/news", (req, res) => {
    const { news } = req.body;
    newsData = news;
    res.json({ success: true, timestamp: Date.now() });
  });

  app.get("/api/screens/:id/content", (req, res) => {
    const { id } = req.params;
    res.json(screenPlaylists[id] || { playlist: [], timestamp: Date.now() });
  });

  app.get("/api/screens/metrics", (req, res) => {
    // Simulate real-time metrics for all screens
    const metrics: Record<string, any> = {
      's1': {
        latency: Math.floor(Math.random() * 20) + 5,
        cpuUsage: Math.floor(Math.random() * 30) + 20,
        gpuUsage: Math.floor(Math.random() * 20) + 10,
        temperature: Math.floor(Math.random() * 10) + 40,
      },
      's2': {
        latency: Math.floor(Math.random() * 40) + 15,
        cpuUsage: Math.floor(Math.random() * 50) + 40,
        gpuUsage: Math.floor(Math.random() * 40) + 30,
        temperature: Math.floor(Math.random() * 15) + 50,
      },
      's3': {
        latency: 0,
        cpuUsage: 0,
        gpuUsage: 0,
        temperature: 22,
      }
    };
    res.json(metrics);
  });

  app.post("/api/screens/:id/power", (req, res) => {
    const { id } = req.params;
    const { power } = req.body;
    console.log(`Power command for screen ${id}: ${power ? 'ON' : 'OFF'}`);
    res.json({ success: true, id, power });
  });

  app.post("/api/screens/:id/restart", (req, res) => {
    const { id } = req.params;
    console.log(`Restart command for screen ${id}`);
    res.json({ success: true, id });
  });

  app.post("/api/publish", (req, res) => {
    const { screenIds, playlist } = req.body;
    const timestamp = Date.now();
    
    screenIds.forEach((id: string) => {
      screenPlaylists[id] = { playlist, timestamp };
    });
    
    res.json({ success: true, timestamp });
  });

  // Vite middleware for development
  const isProduction = process.env.NODE_ENV === "production";
  console.log(`Starting server in ${isProduction ? 'production' : 'development'} mode...`);

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`Serving static files from: ${distPath}`);
    
    // Serve static files
    app.use(express.static(distPath));
    
    // Fallback for SPA
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      console.log(`Fallback: serving ${indexPath}`);
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error(`Error sending index.html: ${err}`);
          res.status(404).send("Page not found - index.html missing");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
