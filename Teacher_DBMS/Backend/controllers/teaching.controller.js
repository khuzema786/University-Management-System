const Teaching = require("../models/teaching.model.js");

// Create and Save a new Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Role
  const teaching = new Teaching({
    erp: req.body.erp,
    course_id: req.body.course_id,
    designation: req.body.designation,
  });

  Teaching.create(teaching, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Teaching staff.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Teaching.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Teaching staff.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Teaching.findById(req.params.erp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teaching staff with erp ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teaching staff with erp " + req.params.erp,
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

  Teaching.findById(req.params.erp, (err, oldData) => {
    console.log(oldData);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teaching staff with erp ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teaching staff with id " + req.params.erp,
        });
      }
    } else {
      const newData = req.body;
      for (element in oldData) {
        if (newData[element] == undefined) newData[element] = oldData[element];
      }
      Teaching.updateById(
        req.params.erp,
        new Teaching(newData),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Teaching staff with erp ${req.params.erp}.`,
              });
            } else {
              res.status(500).send({
                message:
                  "Error updating Teaching staff with erp" + req.params.erp,
              });
            }
          } else res.send(data);
        }
      );
    }
  });
};

exports.delete = (req, res) => {
  Teaching.remove(req.params.erp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teaching staff with erp ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Teaching staff with erp" + req.params.erp,
        });
      }
    } else res.send({ message: `Teaching staff was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Teaching.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Teaching staff.",
      });
    else res.send({ message: `All Teaching staff were deleted successfully!` });
  });
};
