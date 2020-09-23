import Sequelize from 'sequelize';
import { db } from '../config/database'

const Season = db.define('season', {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true
  },
  init_date: {
    type: Sequelize.DataTypes.DATE
  },
  end_date: {
    type: Sequelize.DataTypes.DATE
  },
  actual: {
    type: Sequelize.DataTypes.BOOLEAN
  },
  active: {
    type: Sequelize.DataTypes.BOOLEAN
  },
  created_at: {
    type: Sequelize.DataTypes.TIME
  },
  modified_at: {
    type: Sequelize.DataTypes.TIME
  }
});

export default Season;