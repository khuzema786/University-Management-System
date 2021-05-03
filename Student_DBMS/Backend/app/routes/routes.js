const path = require('path');
const fs = require('fs');
const controller = require('../controllers/controller.js');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../controllers/fields.json')));
const allTables = Object.keys(data); // What's key ? For every a: b, c: d -> this collects [a, c] into array

/**
 * Adds routes to express
 * @param {Object} app Instance of express
 */
function register(app) {
  allTables.forEach((table) => {
    addRoutes(table, app);
  });
}

/**
 * Adds routes related to table
 * @param {Object} app Instance of express
 */
function addRoutes(name, app) {
  // Create a new Course
  app.post(`/${name}`, controller.generateMethods(name).create.bind(controller.generateMethods(name)));
  // Retrieve all Customers
  app.get(`/${name}`, controller.generateMethods(name).findAll.bind(controller.generateMethods(name)));
  // Retrieve a single Customer with customerId
  app.get(
    `/${name}/:${data[name][0]}`,
    controller.generateMethods(name).findOne.bind(controller.generateMethods(name))
  );
  // Update a Customer with customerId
  app.put(`/${name}/:${data[name][0]}`, controller.generateMethods(name).update.bind(controller.generateMethods(name)));
  // Delete a Customer with customerId
  app.delete(
    `/${name}/:${data[name][0]}`,
    controller.generateMethods(name).deleteOne.bind(controller.generateMethods(name))
  );
  // delete all Customer
  app.delete(`/${name}`, controller.generateMethods(name).deleteAll.bind(controller.generateMethods(name)));
}

module.exports = {
  register
};
