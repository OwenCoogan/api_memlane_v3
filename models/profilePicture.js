'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfilePicture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProfilePicture.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  ProfilePicture.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    data: DataTypes.BLOB("long"),
  }, {
    sequelize,
    modelName: 'Image',
  });
  return ProfilePicture;
};
