const Non_teaching = require("../models/non_teaching.model.js");

// Create and Save a new Staff
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Staff
  const non_teaching = new Non_teaching({
    erp: req.body.erp,
    classification: req.body.classification,
  });

  // Save Staff in the database
  Non_teaching.create(non_teaching, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the non_teaching staff.",
      });
    else res.send(data);
  });
};

// Retrieve all Staff from the database.
exports.findAll = (req, res) => {
  Non_teaching.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving non_teaching staff.",
      });
    else res.send(data);
  });
};

// Find a single Staff with a staffId
exports.findOne = (req, res) => {
  Non_teaching.findById(req.params.erp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Staff with id ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Staff with id " + req.params.erp,
        });
      }
    } else res.send(data);
  });
};

// Update a Staff identified by the staff_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Non_teaching.findById(req.params.erp, (err, oldData) => {
    console.log(oldData);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Staff with id ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Staff with id " + req.params.erp,
        });
      }
    } else {
      const newData = req.body;
      for (element in oldData) {
        if (newData[element] == undefined) newData[element] = oldData[element];
      }
      Non_teaching.updateById(
        req.params.erp,
        new Non_teaching(newData),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Non_teaching Staff with erp ${req.params.erp}.`,
              });
            } else {
              res.status(500).send({
                message:
                  "Error updating Non_teaching Staff with erp " +
                  req.params.erp,
              });
            }
          } else res.send(newData);
        }
      );
    }
  });
};

// Delete a Course with the specified course_id in the request
exports.delete = (req, res) => {
  Non_teaching.remove(req.params.erp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Non_teaching Staff with erp ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Non_teaching Staff with erp " + req.params.erp,
        });
      }
    } else res.send({ message: `Staff was deleted successfully!` });
  });
};

// Delete all Staff from the database.
exports.deleteAll = (req, res) => {
  Non_teaching.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all staffs.",
      });
    else res.send({ message: `All Staffs were deleted successfully!` });
  });
};
