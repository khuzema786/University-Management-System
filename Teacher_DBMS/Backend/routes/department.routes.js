// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will reponse. It’s why we’re gonna setup the routes.

// These are routes we define:
//     /dept_id: GET, POST, DELETE
//     department/:dept_id: GET, PUT, DELETE

module.exports = (app) => {
  const department = require("../controllers/department.controller.js");

  // Create a new staff
  app.post("/department", department.create);

  // Retrieve all staff
  app.get("/department", department.findAll);

  // Retrieve a single staff with staff_id
  app.get("/department/:dept_id", department.findOne);

  // Update a staff with staff_id
  app.put("/department/:dept_id", department.update);

  // Delete a staff with staff_id
  app.delete("/department/:dept_id", department.delete);

  // delete all staff
  app.delete("/department", department.deleteAll);
};
// department/:dept_id: GET, PUT, DELETE
