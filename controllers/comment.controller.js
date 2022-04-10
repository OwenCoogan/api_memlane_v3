const { Comment } = require('../models');
const createOne = async (req, res) => {
  const { comment, postId, userId } = req.body;
  const newComment = await Comment.create({
    comment,
    postId,
    userId
  });
  return newComment;
}

module.exports = {
  createOne
}
