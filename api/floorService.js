const tables = require("../data/floor.json");

const getTables = async (req, res) => {
  res.send(tables);
};

module.exports = {
  getTables,
};
