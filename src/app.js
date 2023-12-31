import express from "express";
import cors from "cors";
import routes from "./routes";

import "./database";

class App {
  constructor() {
    this.server = express();
    this.server.use("/file", express.static("tmp/uploads"));
    this.middlewares();
    this.routes();
    this.server.use(cors());
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
    this.server.use(cors());
  }
}

export default new App().server;
