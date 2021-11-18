const fs = require("fs");
const orders = require("../data/orders.json");
const completed = require("../data/completed_orders.json");

const getOrders = async (req, res) => {
  res.send(orders);
};

const writeServedOrders = (order) => {
  completed.unshift(order.data);
  return new Promise((resolve, reject) => {
    const str = JSON.stringify(completed, null, 2);
    fs.writeFileSync("data/completed_orders.json", str, (err) => {
      if (err) {
        console.log("Error occured while saving completed error", err);
        return reject(new Error("Cannot update completed orders file"));
      }
      resolve();
    });
  });
};

module.exports = {
  getOrders,
  writeServedOrders,
};
