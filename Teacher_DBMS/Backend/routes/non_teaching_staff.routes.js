// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will reponse. It’s why we’re gonna setup the routes.

// These are routes we define:
//     /staff: GET, POST, DELETE
//     staff/:staff_id: GET, PUT, DELETE

module.exports = (app) => {
  const non_teaching_staff = require("../controllers/non_teaching.controller.js");

  // Create a new staff
  app.post("/non_teaching_staff", non_teaching_staff.create);

  // Retrieve all staff
  app.get("/non_teaching_staff", non_teaching_staff.findAll);

  // Retrieve a single staff with staff_id
  app.get("/non_teaching_staff/:erp", non_teaching_staff.findOne);

  // Update a staff with staff_id
  app.put("/non_teaching_staff/:erp", non_teaching_staff.update);

  // Delete a staff with staff_id
  app.delete("/non_teaching_staff/:erp", non_teaching_staff.delete);

  // delete all staff
  app.delete("/non_teaching_staff", non_teaching_staff.deleteAll);
};
