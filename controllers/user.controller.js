const Models = require('../models/index');

const createOne = req => {
  return new Promise( (resolve, reject) => {
    console.log(users)
      Models.user.create(req.body)
      .then( data => resolve(data) )
      .catch( err => reject(err) )
  })
}

const readAll = async (req, res) => {
  try {
      const users = await Models.users.findAll();
      console.log(users)
      return res.status(200).json({ users });
  } catch (error) {
      return res.status(500).send(error.message);
  }
}

const readOne = async (req, res) => {

}

const updateOne = async (req, res) => {

}

const deleteOne = async (req, res) => {

}

module.exports = {
        createOne,
        readAll,
        readOne,
        updateOne,
        deleteOne
    }

