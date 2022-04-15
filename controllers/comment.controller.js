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

const updateOne = async (req, res) => {
  const author = await User.findOne({
    where: { id: req.body.userId }
  })
  const comment = await Comment.findOne({
    where: { id: req.params.commentId }
  })
  if(!comment){
    return res.json({
      data: null,
      err: "Post not Found"
    })
  }
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
const deleteOne = async (req, res) => {
  const author = await User.findOne({
    where: { id: req.body.userId }
  })
  const comment = await Comment.findOne({
    where: { id: req.params.id }
  })
  if(!comment){
    return res.json({
      data: null,
      err: "Post not Found"
    })
  }
  if(author.id = comment.userId){
    const deleteSuccess = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deleteSuccess) {
      return res.status(204).json();
    } else {
      res
      .status(500)
      .json({
        status: 500,
        message: 'Server error',
      });
    }
  }
  else{
    res.json({
      data: null,
      err: "You are not the author of this Opst"
    })
  }
}

module.exports = {
  createOne,
  deleteOne,
  updateOne
}
