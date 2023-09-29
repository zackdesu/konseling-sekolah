import app from "./app";
import { createServer } from "http";

const server = createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server run on http://localhost:" + PORT);
});
