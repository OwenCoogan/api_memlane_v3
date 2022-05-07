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
const updateOne = async (req,res) => {
  console.log(req.body)
  const { id, name,description } = req.body;
  const existingUser = await User.findOne({
    where: { id: id },
  });
  if(!existingUser){
    res.json( { err: 'Server Error' } )
  }
  else{
    await existingUser.update({
      name: name,
      description: description,
    })
    .then( apiResponse => res.json( { data: apiResponse, err: null } ))
    .catch( apiError => res.json( { data: null, err: apiError } ))
  }
}

const readAll = async (req,res) => {
    await User.findAll({
      include: [
      ]
    })
    .then( apiResponse => res.json( { data: apiResponse, err: null } ))
    .catch( apiError => res.json( { data: null, err: apiError } ))
}

const readOne = async (req,res) => {
  await User.findOne({
    where: { id: req.body.id },
    include: [
      {
        model: Post,
        as: 'posts'
      },
]
  })
  .then( apiResponse => res.json( { data: {
    id: apiResponse.id,
    name: apiResponse.name,
    email: apiResponse.email,
    role: apiResponse.role
  }, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
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
const checkUser = async (req, res) => {
  const { token } = req.body;
  const decodedJwt = jwt.verify(token,'MemoryLaneCookie')
  const foundUser = await User.findOne({
    where: { email: decodedJwt.email }
  });
  if(foundUser) {
    return res.json({
      data: {
        user:foundUser
      },
      err: null
    });
  }
  else{
    return res.json({
      data: {
        authenticated:false
      },
      err: "Unauthorized"
    });
  }
}

module.exports = {
        createOne,
        readAll,
        login,
        readOne,
        checkUser,
        updateOne
    }

