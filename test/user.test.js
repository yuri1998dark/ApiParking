import "dotenv/config";
import request from "supertest";
import { Server } from "../src/app.js";
const server = new Server();
import User from "../src/models/sequelize/User.model.js";

import { sequelize } from "../src/config/sequelize.config.js";

import { createAccessToken } from "../src/helpers/jwt.js";
//import { createPlaces } from "../src/helpers/setNumOfPlaces.js";

let user;
let cookie;

describe("Update User information", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    user = await User.create({
      name: "Juan",
      email: "juan@gmail.com",
      password: "1234",
      phone: "5678",
      role: "ADMIN",
    });

    cookie = await createAccessToken(user.id);
  });

  test("PUT /parking/users/:id --> user details", async () => {
    const { status, headers, body } = await request(server.app)
      .put(`/parking/users/${user.id}`)
      .set("Cookie", `token=${cookie}`)
      .send({
        name: "Jose Luis",
        email: "jose@gmail.com",
        phone: "76845672",
      });

    expect(status).toEqual(200);
    expect(headers["content-type"]).toEqual(expect.stringContaining("json"));
    expect(body.data).toEqual([1]);
  });

  test("PUT /parking/users/:id --> user not found", async () => {
    const { status, body } = await request(server.app)
      .put("/parking/users/9999999")
      .set("Cookie",`token=${cookie}`)
      .send({
        name: "Ramon Vazquez",
        email: "ramon@gmail.com",
        phone: "76845672",
      });

    expect(status).toEqual(400);
 
    expect(body.data).toEqual(
      expect.stringContaining("Error updating User with id=9999999,user not found")
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
