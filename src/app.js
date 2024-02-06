import express from "express";
import cors from "cors";

export class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            logs: '/api/logs',
            reservations: '/api/reservations',
            users: '/api/users',
        }


    }

    
    middlewares(){
        // Cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
    }
 
    listen(){
        this.app.listen( this.port , () =>{
            console.log(`the server is runnig! port: ${this.port} `)
        })
    }

}

