import http from "http";
import { createSocket } from "./socket";

const express = require("express");

async function main() {
  const app = express();
  const httpServer = http.createServer(app);

  // // enable cors
  // app.use((req: any, res: any, next: any) => {
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  //   next();
  // });

  createSocket(httpServer);

  app.get("/", (req, res) => {
    res.send("Hello World");
  }
  );

  httpServer.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
}

main();
