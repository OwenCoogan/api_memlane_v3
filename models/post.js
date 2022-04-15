'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments',
        onDelete: 'CASCADE',
      });

      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
        onDelete: 'CASCADE',
      })
      Post.hasMany(models.Image, {
        foreignKey: 'imageId',
        as: 'images',
        onDelete: 'CASCADE',
        constraints: false,
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.UUID,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
