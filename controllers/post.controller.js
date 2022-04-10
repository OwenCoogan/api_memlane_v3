
const { Post, Comment } = require('../models');

const createOne = async (req, res) => {
  const { title, content, userId, latitude, longitude } = req.body;
  const post = await Post.create({
    title,
    content,
    latitude,
    longitude,
    userId: userId,
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null }))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

const readAll = async (req, res) => {
  await Post.findAll({
    include: [
      {
        model: Comment,
        as: 'comments'
      },
    ]
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

const readOne = async (req, res) => {
  await Post.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Comment,
        as: 'comments'
      },
    ]
  })
}
const updateOne = async (req, res) => {
  const { title, content, date, author_id } = req.body;
  await Post.update({
    title,
    content,
    date,
    authorId: author_id,
  }, {
    where: {
      id: req.params.id
    }
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

const deleteOne = async (req, res) => {
  const deleteSuccess = await Post.destroy({
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

module.exports = {
        createOne,
        readAll,
        readOne,
        updateOne,
        deleteOne
    }
