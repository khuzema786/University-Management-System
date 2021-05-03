// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will reponse. It’s why we’re gonna setup the routes.

// These are routes we define:
//     /erp: GET, POST, DELETE
//     teaching_staff/:staff_id: GET, PUT, DELETE

module.exports = (app) => {
  const teaching_staff = require("../controllers/teaching.controller.js");

  // Create a new staff
  app.post("/teaching_staff", teaching_staff.create);

  // Retrieve all staff
  app.get("/teaching_staff", teaching_staff.findAll);

  // Retrieve a single staff with staff_id
  app.get("/teaching_staff/:erp", teaching_staff.findOne);

  // Update a staff with staff_id
  app.put("/teaching_staff/:erp", teaching_staff.update);

  // Delete a staff with staff_id
  app.delete("/teaching_staff/:erp", teaching_staff.delete);

  // delete all staff
  app.delete("/teaching_staff", teaching_staff.deleteAll);
};
