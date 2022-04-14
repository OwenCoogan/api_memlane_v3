const { User,Image } = require('../../models');

const jwt = require('jsonwebtoken');
const generateAccessToken = (email, id) => {
  return jwt.sign({ email ,id }, 'MemoryLaneCookie', { expiresIn: '100000000000s' }
  );
}

const createOne = async (req,res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({
    where: { email: email }
  });
  if(!existingUser){
    await User.create({
      name,
      email,
      password,
      role: 'user'
    })
    .then( apiResponse => res.json( { data: apiResponse, err: null } ))
    .catch( err => res.json( { data: null, err: err } ))
  }
  else{
    return res.status(400)
  }
}

const readAll = async (req,res) => {
  const adminUser = await User.findOne({
    where: {
      role: 'super-admin'
    }
  });
  if(adminUser){
    await User.findAll({
      include: [
        {
          model: Image,
          as: 'images'
        },
      ]
    })
    .then( apiResponse => res.json( { data: apiResponse, err: null } ))
    .catch( apiError => res.json( { data: null, err: apiError } ))
  }
  else{
    return res.status(400)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({
    where: { email: email }
  });
  if(foundUser.validPassword(password)) {
    const { email,id } = foundUser;
    const token =  generateAccessToken(email,id);
    return res.json({
      data: {
        token,
        user: {
          id,
          email,
          name: foundUser.name
        }
      },
      err: null
    });
  }
  else{
    return res.json({
      errorCode: 'Server Error'
    });
  }
}

module.exports = {
        createOne,
        readAll,
        login
    }

