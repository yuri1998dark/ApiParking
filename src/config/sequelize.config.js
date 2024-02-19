import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("parking", "postgres", "ubu12345*+", {
  host: "127.0.0.1",
  dialect: "postgres",
  logging:false
});


export const connectSequelize= async()=>{
  await sequelize.sync({force:false})
  .then(() => {
    console.log("parkingDB have been connected");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
 }