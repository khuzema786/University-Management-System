// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will reponse. It’s why we’re gonna setup the routes.

// These are routes we define:
//     /staff: GET, POST, DELETE
//     staff/:staff_id: GET, PUT, DELETE

module.exports = (app) => {
  const courses = require("../controllers/courses.controller.js");

  // Create a new staff
  app.post("/courses", courses.create);

  // Retrieve all staff
  app.get("/courses", courses.findAll);

  // Retrieve a single staff with staff_id
  app.get("/courses/:course_id", courses.findOne);

  // Update a staff with staff_id
  app.put("/courses/:course_id", courses.update);

  // Delete a staff with staff_id
  app.delete("/courses/:course_id", courses.delete);

  // delete all staff
  app.delete("/courses", courses.deleteAll);
};
