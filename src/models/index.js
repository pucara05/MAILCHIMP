'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import config from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const db = {};

// Determinar el entorno de ejecución
const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);

// Leer archivos de modelos y cargarlos
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(async (file) => {
    const model = (await import(path.join(__dirname, file))).default;
    db[model.name] = model(sequelize, DataTypes);
  });

// Configurar asociaciones (si están definidas)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Añadir sequelize y Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
