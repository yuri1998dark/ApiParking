'use strict';
import { DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    password: {
        type:  DataTypes.STRING(64),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'EMPLOYEE', 'CLIENT'),
        defaultValue: 'CLIENT'
    },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};