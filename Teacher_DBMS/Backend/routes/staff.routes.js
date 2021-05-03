// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will reponse. It’s why we’re gonna setup the routes.

// These are routes we define:
//     /staff: GET, POST, DELETE
//     staff/:staff_id: GET, PUT, DELETE

module.exports = (app) => {
  const staff = require("../controllers/staff.controller.js");

  // Create a new staff
  app.post("/staff", staff.create);

  // Retrieve all staff
  app.get("/staff", staff.findAll);

  // Retrieve a single staff with staff_id
  app.get("/staff/:erp", staff.findOne);

  // Update a staff with staff_id
  app.put("/staff/:erp", staff.update);

  // Delete a staff with staff_id
  app.delete("/staff/:erp", staff.delete);

  // delete all staff
  app.delete("/staff", staff.deleteAll);
};
