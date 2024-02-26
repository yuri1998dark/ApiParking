import "dotenv/config";
import request from "supertest";
import { Server } from "../src/app.js";
const server = new Server();
import User from "../src/models/sequelize/User.model.js";
import { sequelize } from "../src/config/sequelize.config.js";

import { createAccessToken } from "../src/helpers/jwt.js";
import { createPlaces } from "../src/helpers/setNumOfPlaces.js";

let cookie;
let user;

beforeAll(async () => {
  await sequelize.sync({ force: true});
  await createPlaces();

  user = await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: "ubu12345*+",
    phone: "5678",
    role: "ADMIN",
  });

  cookie = await createAccessToken(user.id);
  console.log(user.id);
});

describe("Access the parking logs", () => {
  test("GET /parking/logs --> Parking Logs History", async () => {
    const { status, headers, body } = await request(server.app)
      .get("/parking/logs")
      .set("Cookie", `token=${cookie}`);

    expect(status).toEqual(200);
    //   expect(headers['content-type']).toEqual(
    //         expect.stringContaining('json')
    //     )
    expect(body.data.total).toEqual(expect.any(Number));
    expect(body.data.logs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          userId: expect.any(String),
          action: expect.any(String),
          dateTime: expect.any(String),
        }),
      ])
    );
  });
});
