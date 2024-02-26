import { DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize.config.js";
import Reservation from "./Reservation.model.js";

const Place = sequelize.define("places", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  placeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
    tableName:"places"
});

Place.hasMany(Reservation, {
  foreignKey: "placeid",
  sourceKey: "id",
});

Reservation.belongsTo(Place, {
  foreignKey: "placeid",
  targetId: "id",
});

export default Place;
