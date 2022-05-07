const fs = require("fs");
const { Image,User,Post,Comment } = require('../../models');
const uploadProfilePicture = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.json(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      imageId: req.params.id,
      imageType: 'profile',
      data: fs.readFileSync(
        __basedir + `/resources/static/assets/uploads/user/${req.file.filename}`
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + `/resources/static/assets/tmp/user/${image.name}`,
        image.data
      );
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    return res.json(`Error when trying upload images: ${error}`);
  }
};
const getUserProfile = async (req, res) => {
  console.log(req.params.id)
  if (req.body === undefined) {
    return res.json(`You must select a user.`);
  }
  await User.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Post,
        as: 'posts',
      },
      {
        model: Comment,
        as: 'comments',
      },

    ]
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
};

module.exports = {
  uploadProfilePicture,
  getUserProfile
};
