import Sequelize from 'sequelize';
import { db } from '../config/database'
import User from './User.model';

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
  id_user: {
    type: Sequelize.DataTypes.BIGINT
  }

}, {
  timestamps: false
});

export default Team;