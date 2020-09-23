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
  username: {
    type: Sequelize.DataTypes.TEXT
  },
  firstname: {
    type: Sequelize.DataTypes.TEXT
  },
  lastname: {
    type: Sequelize.DataTypes.TEXT
  },
  is_admin: {
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
  },
  last_access: {
    type: Sequelize.DataTypes.TIME
  }

}, {
  timestamps: false
});

User.hasMany(Team, { foreignKey: 'user_id', sourceKey: 'id'});
Team.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id'});

export default User;