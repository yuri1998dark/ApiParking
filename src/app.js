import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./models/sequelize/User.model.js";
import "./models/sequelize/Reservation.model.js";
import "./models/sequelize/Place.model.js";
import { connectSequelize } from "./config/sequelize.config.js";
import { connectMongo } from "./config/mongo.config.js";
import { authRoutes, reservationsRoutes,logRoutes,userRoutes} from "./routes/exportAllRoutes.js";
import { createPlaces } from "./helpers/setNumOfPlaces.js";

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/parking/auth", //done
      logs: "/parking/logs", //done
      reservations: "/parking/reservations", //done
      users: "/parking/users", //done
    };
   
    this.setNumOfPlaces();
    this.middlewares();
    this.dbConnection();
    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // body parsing
    this.app.use(express.json());
    // cookie parsing
    this.app.use(cookieParser());
  }

  async dbConnection() {
    connectSequelize();
    connectMongo();
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.logs, logRoutes);
    this.app.use(this.paths.reservations, reservationsRoutes);
    this.app.use(this.paths.users, userRoutes);
  }

  async setNumOfPlaces() {
    await createPlaces();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`the server is runnig! port: ${this.port} `);
    });
  }
}
