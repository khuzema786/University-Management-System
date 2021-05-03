const Courses = require("../models/courses.model.js");

// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Course
  const courses = new Courses({
    course_id: req.body.course_id,
    course_name: req.body.course_name,
    completion_time: req.body.completion_time,
  });

  // Save Course in the database
  Courses.create(courses, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course.",
      });
    else res.send(data);
  });
};

// Retrieve all Course from the database.
exports.findAll = (req, res) => {
  Courses.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Course.",
      });
    else res.send(data);
  });
};

// Find a single Course with a CourseId
exports.findOne = (req, res) => {
  Courses.findById(req.params.course_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.course_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.course_id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Courses.findById(req.params.course_id, (err, oldData) => {
    console.log(oldData);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.course_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.course_id,
        });
      }
    } else {
      const newData = req.body;
      for (element in oldData) {
        if (newData[element] == undefined) newData[element] = oldData[element];
      }
      Courses.updateById(
        req.params.course_id,
        new Courses(newData),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Course with id ${req.params.course_id}.`,
              });
            } else {
              res.status(500).send({
                message:
                  "Error updating Course with id " + req.params.course_id,
              });
            }
          } else res.send(newData);
        }
      );
    }
  });
};

// Delete a Course with the specified erp in the request
exports.delete = (req, res) => {
  Courses.remove(req.params.course_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found course with id ${req.params.course_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete course with id " + req.params.course_id,
        });
      }
    } else res.send({ message: `Course was deleted successfully!` });
  });
};

// Delete all Course from the database.
exports.deleteAll = (req, res) => {
  Courses.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Courses.",
      });
    else res.send({ message: `All Courses were deleted successfully!` });
  });
};
