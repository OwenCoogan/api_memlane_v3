const { User,Image } = require('../models');

const jwt = require('jsonwebtoken');

const generateAccessToken = (email, id) => {
  return jwt.sign({ email ,id }, 'session', { expiresIn: '100000000000s' }
  );
}

const createOne = async (req) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({
    where: { email: email }
  });
  if(!existingUser){
    const user = await User.create({
      name,
      email,
      password
    });
    console
  return user
  }
  else{
    return res.status(400)
  }
}

const readAll = async () => {
      const users = await User.findAll(
        {
          include: [
            {
              model: Image,
              as: 'profileImage',
            },
          ]
        }
      );
      return users;
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({
    where: { email: email }
  });
  if(foundUser.validPassword(password)) {
    const { email,id } = foundUser;
    const token = generateAccessToken(email,id);
    return token;
  }
}

module.exports = {
        createOne,
        readAll,
        login
    }

