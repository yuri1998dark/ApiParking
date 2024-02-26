import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.config.js";
import Reservation from "./Reservation.model.js";
// import { Task } from "./Task.js";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("ADMIN", "EMPLOYEE", "CLIENT"),
    defaultValue: "CLIENT",
  },
},{tableName:'users'});

User.hasMany(Reservation, {
  foreignKey: "reservationid",
  sourceKey: "id",
});

Reservation.belongsTo(User, {
  foreignKey: "reservationid",
  targetId: "id",
});

export default User;
