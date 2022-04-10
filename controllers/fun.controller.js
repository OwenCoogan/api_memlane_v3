const axios = require('axios');

const RickAndMortyApi = async (req,res) => {
  try {
    return await axios.get('https://rickandmortyapi.com/api/character')
  } catch (error) {
    console.error(error)
  }
}


module.exports = {
  RickAndMortyApi
}

