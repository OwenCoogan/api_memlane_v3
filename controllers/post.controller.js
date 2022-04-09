
const { Post } = require('../models');

const createOne = async (req, res) => {
  const { title, content, date, author_id } = req.body;
  const post = await Post.create({
    title,
    content,
    date,
    authorId: author_id,
  });

  return post;
}

const readAll = async (req, res) => {
  const posts = await Post.findAll()
  return posts;
}

const readOne = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id
    }
  });
  return post;
}

const updateOne = async (req, res) => {
  const { title, content, date, author_id } = req.body;
  const post = await Post.update({
    title,
    content,
    date,
    authorId: author_id,
  }, {
    where: {
      id: req.params.id
    }
  });

  return post;
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
