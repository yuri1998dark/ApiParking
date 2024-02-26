import "dotenv/config";
import request from "supertest";
import { Server } from "../src/app.js";
const server = new Server();
import User from "../src/models/sequelize/User.model.js";
import Reservation from "../src/models/sequelize/Reservation.model.js";
import Place from "../src/models/sequelize/Place.model.js";
import { sequelize } from "../src/config/sequelize.config.js";

import { createAccessToken } from "../src/helpers/jwt.js";
import { createPlaces } from "../src/helpers/setNumOfPlaces.js";

let user;
let cookie;

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await createPlaces();

  user = await User.create({
    name: "Juan",
    email: "juan@gmail.com",
    password: "1234",
    phone: "5678",
    role: "ADMIN",
  });

  cookie = await createAccessToken(user.id);

  const place = await Place.findOne();

  await Reservation.create({
    startDateTime: new Date(Date.now() - 5 * 60 * 1000),
    endDateTime: new Date("2025"),
    carDetails: {
      brand: "Toyoya",
      model: "Supra",
      plate: "gr412as",
    },
    reservationid: user.id,
    placeid: place.id,
  });
});

describe("Reserve a Parking place", () => {
  test("POST /parking/reservations --> reservation details", async () => {
    const { status, headers, body } = await request(server.app)
      .post("/parking/reservations")
      .set("Cookie", `token=${cookie}`)
      .send({
        body: {
          startDateTime: "2024-02-27 18:03:10.987",
          endDateTime: "2024-02-27 22:37:10.987",
          carDetails: {
            manufacturer: "Moskovich",
            color: "Yellow",
          },
        },
      });

    expect(status).toEqual(200);
    expect(headers["content-type"]).toEqual(expect.stringContaining("json"));
    expect(body.data).toEqual(
      expect.objectContaining({ carDetails: expect.any(Object) }),

      expect.objectContaining({
        id: expect.any(String),
        status: expect.any(String),
        reservationid: expect.any(String),
        placeid: expect.any(String),
        startDateTime: expect.any(String),
        endDateTime: expect.any(String),

        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })
    );
  });

  test("POST /parking/reservations/ --> startDatetime and endDateTime are requireds!!!", async () => {
    const { status, body } = await request(server.app)
      .post("/parking/reservations/")
      .set("Cookie", `token=${cookie}`)
      .send({});

    expect(status).toEqual(400), expect(body).toEqual(["Required"]);
  });

  test("POST /parking/reservations/ --> 401 Unauthorized", async () => {
    const { status, body } = await request(server.app)
      .post("/parking/reservations/")
      .send({
        startDateTime: new Date(),
        endDateTime: new Date(),
        carDetails: {
          brand: "toyota",
          modelo: "supra",
          chapa: "pkg5467",
        },
      });

    expect(status).toEqual(401),
      expect(body.message).toEqual(
        expect.stringContaining("No token, authorization denied")
      );
  });

  test("POST /parking/reservations/ --> Reservation in past", async () => {
    const { status, body } = await request(server.app)
      .post("/parking/reservations/")
      .set("Cookie", `token=${cookie}`)
      .send({
        body: {
          startDateTime: "2024-02-25 18:03:10.987",
          endDateTime: "2024-02-25 22:37:10.987",
          carDetails: {
            brand: "mercedes",
            modelo: "c200",
            chapa: "pkg5467",
          },
        },
      });

    expect(status).toEqual(400);
    expect(body.data).toEqual(
      expect.stringContaining("No se puede crear una reserva en el pasado")
    );
  });

  test("POST /parking/reservations/ --> endDateTime always have to be after startDateTime", async () => {
    const { status, body } = await request(server.app)
      .post("/parking/reservations/")
      .set("Cookie", `token=${cookie}`)
      .send({
        body: {
          startDateTime: "2024-07-29 18:03:10.987",
          endDateTime: "2024-02-24 22:37:10.987",
          carDetails: {
            brand: "toyota",
            modelo: "corolla-2006",
            chapa: "pkg5467",
          },
        },
      });

    expect(status).toEqual(400);
    expect(body.data).toEqual(
      expect.stringContaining(
        "endDateTime siempre debe ser después de startDateTime"
      )
    );
  })
  test('POST /api/reservations --> overlaping reservation', async() => {

    const totalPlaces = await Place.count();

   /*  await Reservation.destroy({
        where: {},
        truncate: true
    }) */

    for(let i = 1; i <= totalPlaces; i++){
        const place = await Place.findOne({
            where: {placeNumber: i}
        })
        await Reservation.create({
            startDateTime: "2024-07-29 18:03:10.987",
            endDateTime: "2024-07-29 22:37:10.987",
            carDetails: {
                brand: 'Toyoya',
                model: 'Corolla',
                plate: 'gr412as'
            },
            reservationidId: user.id,
            placeid: place.id,
        })
    }

    const {status, headers, body} = await request(server.app)
    .post('/parking/reservations')
    .set("Cookie",`token=${cookie}`)
    .send({
        body:{

            startDateTime: "2024-07-29 18:03:10.987", 
            endDateTime: "2024-07-29 22:37:10.987",
            carDetails: {
                "brand": "toyota",
                "modelo": "corolla-2006",
                "chapa": "pkg5467"
            }

        }
    });

    expect(status).toEqual(400)
    expect(body.data).toEqual(
        expect.stringContaining("No hay plazas de aparcamiento disponibles en ese horario.")
    )
})
  
  



});

describe("Get currect occupancy of Parking", () => {
  test("GET /parking/reservations/ --> occupancy details", async () => {
    const { status, body } = await request(server.app)
      .get("/parking/reservations/")
      .set("Cookie", `token=${cookie}`);

    expect(status).toEqual(200);
    expect(body.data).toEqual(
      expect.objectContaining({
        totalPlaces: 20,
        occupiedPlace: 1,
        availablePlaces: 19,
        occupationPercentage: "5%",
      })
    );
  });
});

afterAll(async () => {
  await sequelize.close();
});
