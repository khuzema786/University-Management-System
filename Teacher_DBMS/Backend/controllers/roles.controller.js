const Role = require("../models/roles.model.js");

// Create and Save a new Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Role
  const role = new Role({
    role_id: req.body.role_id,
    erp: req.body.erp,
    role_name: req.body.role_name,
  });

  Role.create(role, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Role.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Role.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving role.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Role.findById(req.params.role_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with id ${req.params.role_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Role with id " + req.params.role_id,
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

  Role.findById(req.params.role_id, (err, oldData) => {
    console.log(oldData);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with id ${req.params.role_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Role with id " + req.params.role_id,
        });
      }
    } else {
      const newData = req.body;
      for (element in oldData) {
        if (newData[element] == undefined) newData[element] = oldData[element];
      }
      Role.updateById(req.params.role_id, new Role(newData), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Role with role_id ${req.params.role_id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating Role with role_id " + req.params.role_id,
            });
          }
        } else res.send(data);
      });
    }
  });
};

exports.delete = (req, res) => {
  Role.remove(req.params.role_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Role with role_id ${req.params.role_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Role with role_id " + req.params.role_id,
        });
      }
    } else res.send({ message: `Role was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Role.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all role.",
      });
    else res.send({ message: `All Role were deleted successfully!` });
  });
};
