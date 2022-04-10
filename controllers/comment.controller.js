const { Comment } = require('../models');
const createOne = async (req, res) => {
  const { comment, postId, userId } = req.body;
  await Comment.create({
    comment,
    postId,
    userId
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

const deleteOne = async (req, res) => {
  const { postId } = req.body;
  await Comment.delete({
    where: {
      id: postId
    }
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

module.exports = {
  createOne,
  deleteOne
}
