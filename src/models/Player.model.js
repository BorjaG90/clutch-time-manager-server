import Sequelize from 'sequelize';
import { db } from '../config/database'

const Player = db.define('players', {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true
  },
  firstname: {
    type: Sequelize.DataTypes.TEXT
  },
  lastname: {
    type: Sequelize.DataTypes.TEXT
  },
  position: {
    type: Sequelize.DataTypes.INTEGER
  },
  second_p: {
    type: Sequelize.DataTypes.INTEGER
  }

}, {
  timestamps: false
});

export default Player;