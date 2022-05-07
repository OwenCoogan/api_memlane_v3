
const { Post , Comment , Image , User, Tag  } = require('../models');
const { Op } = require("sequelize");
const fs = require("fs");
const rangeCheck = require('../middleware/rangeCheck.middleware');

const createOne = async (req, res) => {
  const { title, content, userId, latitude, longitude, tags  } = req.body;
  await Post.create({
    title,
    content,
    latitude:latitude,
    longitude:longitude,
    userId: userId,
  })
  .then( apiResponse => {
    res.json( { data: apiResponse, err: null })
  })
  .catch( apiError => res.json( { data: null, err: apiError } ))
}
const readAll = async (req, res) => {
  if(req.body.latitude){
    const range = rangeCheck(req);
    await Post.findAll({
      where: {
        latitude: {
          [Op.between]: [range.latitude.min, range.latitude.max]
        },
        longitude: {
          [Op.between]: [range.longitude.min, range.longitude.max]
        }
      },
      include: [
        {
          model: Image,
          as: 'images'
        },
        {
          model: User,
          as: 'author'
        },

      ]
    })
    .then( apiResponse => res.json( { data: apiResponse, err: null } ))
    .catch( apiError => res.json( { data: null, err: apiError } ))
  }
  else{
    await Post.findAll({
      include: [
        {
          model: Image,
          as: 'images'
        },
        {
          model: User,
          as: 'author'
        },

      ]
    })
    .then( apiResponse => res.json( { data: apiResponse, err: 'You should specify gps position' } ))
    .catch( apiError => res.json( { data: null, err: apiError } ))
  }
}

const readOne = async (req, res) => {
  await Post.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Comment,
        as: 'comments',
        include: [{
          model: User,
          as: 'author'
        }]
      },
      {
        model: Image,
        as: 'images'
      },
      {
        model: User,
        as: 'author'
      },

    ]
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

const updateOne = async (req, res) => {
  const author = await User.findOne({
    where: { id: req.body.userId }
  })
  const post = await Post.findOne({
    where: { id: req.params.id }
  })
  if(!post){
    return res.json({
      data: null,
      err: "Post not Found"
    })
  }
  if(author.id = post.userId){
    const updateSuccess = await Post.update({
      ...req.body
    }, {
      where: {
        id: req.params.id
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
  const post = await Post.findOne({
    where: { id: req.params.id }
  })
  if(!post){
    return res.json({
      data: null,
      err: "Post not Found"
    })
  }
  if(author.id = post.userId ){
    const deleteSuccess = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deleteSuccess) {
      res.json({
        data: deleteSuccess,
        err: null
      })
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

const AddPicture = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.json(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      imageType: 'post',
      imageId: req.params.id,
      name: req.file.filename,
      data: fs.readFileSync(
        __basedir + `/resources/static/assets/uploads/post/${req.file.filename}`
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + `/resources/static/assets/tmp/post/${req.file.filename}`,
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
        AddPicture,
    }
