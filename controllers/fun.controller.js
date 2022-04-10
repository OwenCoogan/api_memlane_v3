const axios = require('axios');

const duneQuote = async (req,res) => {
  await axios.get('https://the-dune-api.herokuapp.com/quotes/10')
  .then(response => {
    return response
  })
}


module.exports = {
  duneQuote
}

