const Department = require("../models/department.model.js");

//Create and save a new Department Object
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a department object
  const depart = new Department({
    dept_id: req.body.dept_id,
    name: req.body.name,
  });
  // Save staff in the database
  Department.create(depart, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while cretaing the department",
      });
    else res.send(data);
  });
};

// Retrieve all Department from the database
exports.findAll = (req, res) => {
  Department.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving Department",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Department.findById(req.params.dept_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Department with dept_id= ${req.params.dept_id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Department with dept_id= ${req.params.dept_id}`,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  Department.findById(req.params.dept_id, (err, oldData) => {
    console.log(oldData);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not Found Department with dept_id= ${req.params.dept_id}.`,
        });
      }
    } else {
      const newData = req.body;
      for (element in oldData) {
        if (newData[element] == undefined) newData[element] = oldData[element];
      }
      Department.updateById(
        req.params.dept_id,
        new Department(newData),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not Found Department with dept_id= ${req.params.dept_id}.`,
              });
            } else {
              res.status(404).send({
                message: `Not Found Department with dept_id= ${req.params.dept_id}`,
              });
            }
          } else res.send(newData);
        }
      );
    }
  });
};

//Delete a course with the specified dept_id in the request
exports.delete = (req, res) => {
  Department.remove(req.params.dept_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Could not find Department with dept_id= ${req.params.dept_id}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Department with dept_id= ${req.params.dept_id}`,
        });
      }
    } else res.send({ message: `Department was deleted successfully! ` });
  });
};
// Delete all Department from the database.
exports.deleteAll = (req, res) => {
  Department.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Departments.",
      });
    else res.send({ message: `All Departments were deleted successfully!` });
  });
};
