import 'dotenv/config'

import { Server } from "./app.js";
export const server = new Server;


server.listen();
