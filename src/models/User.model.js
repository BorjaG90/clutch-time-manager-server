import Sequelize from 'sequelize';

import { db } from '../config/database'
import Team from './Team.model';

const User = db.define('users', {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true
  },
  email: {
    type: Sequelize.DataTypes.TEXT
  },
  password: {
    type: Sequelize.DataTypes.TEXT
  },
  name: {
    type: Sequelize.DataTypes.TEXT
  }

}, {
  timestamps: false
});

User.hasMany(Team, { foreignKey: 'id_user', sourceKey: 'id'});
Team.belongsTo(User, { foreignKey: 'id_user', sourceKey: 'id'});

export default User;