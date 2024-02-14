import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config.js";
// import { Task } from "./Task.js";

export const Reservation = sequelize.define("reservations", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      startDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      carDetails: {
        type: DataTypes.JSON,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('ACTIVE', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'), 
        defaultValue: 'ACTIVE'
      },
});