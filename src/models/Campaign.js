import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Campaing extends Model {}

Campaing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    listId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    replyTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Campaing',
    tableName: 'campaings', // Cambia a minúsculas
    timestamps: true,
  }
);

export default Campaing;
