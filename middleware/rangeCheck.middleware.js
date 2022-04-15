
const rangeCheck = (req) => {
  return {
    latitude:{
      min: req.body.latitude - 0.1,
      max: req.body.latitude + 0.1,
    },
    longitude:{
      min: req.body.longitude - 0.1,
      max: req.body.longitude + 0.1,
    },
  }
};
module.exports = rangeCheck;
