import express from "express";
import cors from "cors";
import {sequelize} from "./config/config.js"

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/parking/auth",
      logs: "/parking/logs",
      reservations: "/parking/reservations",
      users: "/parking/users",
    };
  
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // body parsing
    this.app.use(express.json());
  }

  async dbConnection(){
    try {
      await sequelize.sync();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`the server is runnig! port: ${this.port} `);
    });
  }
}
