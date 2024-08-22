import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class campaing extends Model {}

campaing.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    campaingId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'campaings',
    timestamps: true,
  }
);


export default campaing;