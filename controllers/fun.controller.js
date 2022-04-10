const axios = require('axios');

const RickAndMortyApi = async (req,res) => {
  try {
    return await axios.get('https://rickandmortyapi.com/api/character')
    .then( apiResponse => res.json( { data: apiResponse.data.results, err: null } ))
    .catch( apiError => res.json( { data: null, err: apiError } ))
  } catch (error) {
    console.error(error)
  }
}


module.exports = {
  RickAndMortyApi
}

