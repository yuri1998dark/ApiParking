import { Sequelize } from "sequelize";


const sequelize = new Sequelize("parking", "parkingAdministrator", "parkingGuajiritos123!@#", {
  host: "localhost",
  dialect: "mysql",
});



export {sequelize}