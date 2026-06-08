import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import shippingRouter from "./routes/shipping";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.json());

  // API routes MUST be before static files
  app.use('/api/shipping', shippingRouter);

  // Test endpoint
  app.post('/api/test', (req, res) => {
    res.json({ success: true, message: 'Test endpoint working' });
  });

  // Debug: log all requests
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
