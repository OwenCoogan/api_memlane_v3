'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author'
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'id',
        as: 'post'
      });
    }
  }
  Comment.init({
    postId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
