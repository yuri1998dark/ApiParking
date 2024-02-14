import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("parking", "postgres", "ubu12345*+", {
  host: "127.0.0.1",
  dialect: "postgres",
});


