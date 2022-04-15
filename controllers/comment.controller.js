const { Comment,User } = require('../models');
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
  const { commentId } = req.body;
  await Comment.delete({
    where: {
      id: commentId
    }
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}


const updateOne = async (req, res) => {
  const author = await User.findOne({
    where: { id: req.body.userId }
  })
  const comment = await Comment.findOne({
    where: { id: req.params.commentId }
  })
  if(author.id = comment.userId){
    const updateSuccess = await Comment.update({
      ...req.body
    }, {
      where: {
        id: req.params.commentId
      }
    });
    if(updateSuccess!=null){
      res.json({
        data: updateSuccess,
        err: null
      })
    }
    else{
      res.json({
        err: "Server Error"
      })
    }
  }
  else{
    res.json({
      data: null,
      err: "You are not the author of this comment"
    })
  }
}

module.exports = {
  createOne,
  deleteOne,
  updateOne
}
