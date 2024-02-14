import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config.js";
import { Reservation } from "./Reservation.js";


export const Place = sequelize.define("places", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    placeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Place.hasMany(Reservation,{
    foreignKey:'placeid',
    sourceKey:'id'
})

Reservation.belongsTo(Place,{
    foreignKey:'placeid',
    targetId:'id'

})
