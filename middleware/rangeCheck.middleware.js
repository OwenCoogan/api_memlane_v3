
const rangeCheck = (req) => {
  const builtRange = req.body.range ? req.body.range/10 : 0.1;
  return {
    latitude:{
      min: req.body.latitude - builtRange,
      max: req.body.latitude + builtRange,
    },
    longitude:{
      min: req.body.longitude - builtRange,
      max: req.body.longitude + builtRange,
    },
  }
};
module.exports = rangeCheck;
