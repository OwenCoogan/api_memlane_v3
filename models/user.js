const bcrypt = require('bcrypt');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE',
      });

      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
         const salt = await bcrypt.genSaltSync(10, 'secret');
         user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async  (user, options) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'secret');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    modelName: 'User',
  });
  return User;
};
