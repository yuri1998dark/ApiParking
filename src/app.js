import express from "express";
import cors from "cors";
import './models/sequelize/User.models.js';
import './models/sequelize/Reservation.js'
import './models/sequelize/Place.js'
import { sequelize } from "./config/config.js";
import { authRoutes } from "./routes/exportAllRoutes.js";


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
  
  this.middlewares();

  this.dbConnection();
  this.routes();
  


}

  middlewares() {
    // Cors
    this.app.use(cors());
    // body parsing
    this.app.use(express.json());
  }

  async dbConnection(){
    await sequelize.sync()
        .then(() => {
          console.log("Synced parkingDB.");
        })
        .catch((err) => {
          console.log("Failed to sync db: " + err.message);
        });
  }
  routes(){
    this.app.use(this.paths.auth, authRoutes);
   // this.app.use(this.paths.logs, logsRoutes);
   // this.app.use(this.paths.reservations, reservationRoutes);
   // this.app.use(this.paths.users, userRoutes);
}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`the server is runnig! port: ${this.port} `);
    });
  }
}
