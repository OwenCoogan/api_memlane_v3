
const { Post, Comment, Image } = require('../models');
const fs = require("fs");
const createOne = async (req, res) => {
  const { title, content, userId, latitude, longitude  } = req.body;
  await Post.create({
    title,
    content,
    latitude:latitude,
    longitude:longitude,
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
      {
        model: Image,
        as: 'images'
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
      {
        model: Image,
        as: 'images'
      },

    ]
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}
const updateOne = async (req, res) => {
  const { title, content, userId, latitude, longitude  } = req.body;
  const point = { type: 'Point', coordinates: [latitude, longitude]};
  await Post.update({
    title,
    content,
    latitude,
    longitude,
    userId: userId,
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

const AddPicture = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.json(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      imageType: 'post',
      imageId: req.params.id,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + `/resources/static/assets/uploads/post/${req.file.filename}`
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + `/resources/static/assets/tmp/post/${image.name}`,
        image.data
      );
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    return res.json(`Error when trying upload images: ${error}`);
  }
}


module.exports = {
        createOne,
        readAll,
        readOne,
        updateOne,
        deleteOne,
        AddPicture
    }
