import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
// import { Task } from "./Task.js";

export const User = sequelize.define("user", {
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
});

/* Project.hasMany(Task,{
    foreignKey:'projectid',
    sourceKey:'id'
})

Task.belongsTo(Project,{
    foreignKey:'projectid',
    targetId:'id'

}) */
