'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostPicture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostPicture.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  }
  PostPicture.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    data: DataTypes.BLOB("long"),
  }, {
    sequelize,
    modelName: 'Image',
  });
  return PostPicture;
};
