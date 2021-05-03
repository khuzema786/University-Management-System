// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will reponse. It’s why we’re gonna setup the routes.

// These are routes we define:
//     /staff: GET, POST, DELETE
//     staff/:staff_id: GET, PUT, DELETE

module.exports = (app) => {
  const student = require("../controllers/student.controller.js");

  // Create a new staff
  app.post("/student", student.create);

  // Retrieve all staff
  app.get("/student", student.findAll);

  // Retrieve a single staff with staff_id
  app.get("/student/:stud_erp", student.findOne);

  // Update a staff with staff_id
  app.put("/student/:stud_erp", student.update);

  // Delete a staff with staff_id
  app.delete("/student/:stud_erp", student.delete);

  // delete all staff
  app.delete("/student", student.deleteAll);
};
