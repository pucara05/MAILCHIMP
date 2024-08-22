import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Carga las variables de entorno desde .env

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_DIALECT
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false, // Puedes habilitar el registro si necesitas depuración
});

export default sequelize;
