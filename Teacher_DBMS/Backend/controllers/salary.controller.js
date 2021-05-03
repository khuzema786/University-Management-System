const Salary = require("../models/salary.model.js");

// Create and Save a new Staff
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Staff
  const salary = new Salary({
    erp: req.body.erp,
    provident_fund: req.body.provident_fund,
    forced_saving: req.body.forced_saving,
    net_amt: req.body.net_amt,
  });

  // Save Staff in the database
  Salary.create(salary, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Salary .",
      });
    else res.send(data);
  });
};

// Retrieve all Staff from the database.
exports.findAll = (req, res) => {
  Salary.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Salary.",
      });
    else res.send(data);
  });
};

// Find a single Staff with a staffId
exports.findOne = (req, res) => {
  Salary.findById(req.params.erp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Salary with erp ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Salary with erp " + req.params.erp,
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

  Salary.findById(req.params.erp, (err, oldData) => {
    console.log(oldData);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Salary with id ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Salary with id " + req.params.erp,
        });
      }
    } else {
      const newData = req.body;
      for (element in oldData) {
        if (newData[element] == undefined) newData[element] = oldData[element];
      }
      Salary.updateById(req.params.erp, new Salary(newData), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Staff with erp ${req.params.erp}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating Salary with erp " + req.params.erp,
            });
          }
        } else res.send(newData);
      });
    }
  });
};

// Delete a Course with the specified course_id in the request
exports.delete = (req, res) => {
  Salary.remove(req.params.erp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Salary with erp ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Salary with erp " + req.params.erp,
        });
      }
    } else res.send({ message: `Salary was deleted successfully!` });
  });
};

// Delete all Staff from the database.
exports.deleteAll = (req, res) => {
  Salary.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Salary.",
      });
    else res.send({ message: `All Salary were deleted successfully!` });
  });
};
