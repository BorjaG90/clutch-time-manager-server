import Sequelize from 'sequelize';
import { db } from '../config/database'

const Team = db.define('teams', {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true
  },
  name: {
    type: Sequelize.DataTypes.TEXT
  },
  city: {
    type: Sequelize.DataTypes.TEXT
  },
  user_id: {
    type: Sequelize.DataTypes.BIGINT
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

}, {
  timestamps: false
});

export default Team;