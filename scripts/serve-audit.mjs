import { createServer } from "vite";
const server = await createServer({
  server: { host: "127.0.0.1", port: 5181, strictPort: true, hmr: false },
});
await server.listen();
server.printUrls();
