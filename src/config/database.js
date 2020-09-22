import Sequelize from 'sequelize';

import { database } from './keys';
export const db =  new Sequelize(
  database.database,
  database.user,
  database.password,
  {
    host: database.host,
    dialect: database.dialect,
    operatorAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
);
