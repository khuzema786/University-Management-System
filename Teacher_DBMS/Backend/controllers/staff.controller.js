const Staff = require("../models/staff.model.js");

// Create and Save a new Staff
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Staff
  const staff = new Staff({
    erp: req.body.erp,
    dept_id: req.body.dept_id,
    name: req.body.name,
    password: req.body.password,
    email_id: req.body.email_id,
  });

  // Save Staff in the database
  Staff.create(staff, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Staff.",
      });
    else res.send(data);
  });
};

// Retrieve all Staff from the database.
exports.findAll = (req, res) => {
  Staff.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving staff.",
      });
    else res.send(data);
  });
};

// Find a single Staff with a staffId
exports.findOne = (req, res) => {
  Staff.findById(req.params.erp, (err, data) => {
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
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//   }

//   console.log(req.body);

//   Staff.updateById(req.params.staff_erp, new Staff(req.body), (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Staff with erp ${req.params.staff_erp}.`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Error updating Staff with erp " + req.params.staff_erp,
//         });
//       }
//     } else res.send(data);
//   });
// };

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Staff.findById(req.params.erp, (err, oldData) => {
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
      Staff.updateById(req.params.erp, new Staff(newData), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Staff with erp ${req.params.erp}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating Staff with erp " + req.params.erp,
            });
          }
        } else res.send(newData);
      });
    }
  });
};

// Delete a Course with the specified course_id in the request
exports.delete = (req, res) => {
  Staff.remove(req.params.erp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Staff with erp ${req.params.erp}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Staff with erp " + req.params.erp,
        });
      }
    } else res.send({ message: `Staff was deleted successfully!` });
  });
};

// Delete all Staff from the database.
exports.deleteAll = (req, res) => {
  Staff.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all staffs.",
      });
    else res.send({ message: `All Staffs were deleted successfully!` });
  });
};
