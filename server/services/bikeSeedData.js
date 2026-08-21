const { BIKES_DATA } = require('../../client/src/data/bikesData.js');

const bikeSeedVehicles = BIKES_DATA.map(b => ({
  ...b,
  _id: undefined,
}));

module.exports = { bikeSeedVehicles, BIKES_DATA };
