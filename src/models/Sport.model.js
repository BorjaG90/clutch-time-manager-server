import Sequelize from 'sequelize';
import { db } from '../config/database'

import Team from './Team.model';

const Sport = db.define('sports', {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true
  },
  name: {
    type: Sequelize.DataTypes.TEXT
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

Sport.hasMany(Team, { foreignKey: 'sport_id', sourceKey: 'id'});
Team.belongsTo(Sport, { foreignKey: 'sport_id', sourceKey: 'id'});

export default Sport;