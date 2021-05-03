const Attendance = require("../models/attendance.model.js");

// Create and Save a new Staff
/*
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
*/

// Retrieve all Staff from the database.
exports.findAll = (req, res) => {
  Attendance.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Attendance.",
      });
    else res.send(data);
  });
};

// Find a single Staff with a staffId
exports.findOne = (req, res) => {
  Attendance.findById(parseInt(req.params.erp) % 100, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Attendance with id ${
            parseInt(req.params.erp) % 100
          }.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Attendance with id " +
            (parseInt(req.params.erp) % 100),
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

  Attendance.findById(req.params.erp % 100, (err, oldData) => {
    console.log(oldData);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Attendance with id ${req.params.erp % 100}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Attendance with id " + (req.params.erp % 100),
        });
      }
    } else {
      const newData = req.body;
      for (element in oldData) {
        if (newData[element] == undefined) newData[element] = oldData[element];
      }
      Attendance.updateById(
        req.params.erp % 100,
        new Attendance(newData),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Staff with erp ${req.params.erp % 100}.`,
              });
            } else {
              res.status(500).send({
                message: "Error updating Staff with erp " + req.params.erp,
              });
            }
          } else res.send(newData);
        }
      );
    }
  });
};

// Delete a Staff with the specified erp in the request
exports.delete = (req, res) => {
  Attendance.remove(req.params.erp % 100, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Attendance with erp ${req.params.erp & 100}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Attendance with erp " + (req.params.erp % 100),
        });
      }
    } else res.send({ message: `Attendance was deleted successfully!` });
  });
};

// Delete all Staff from the database.
exports.deleteAll = (req, res) => {
  Attendance.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all staffs.",
      });
    else res.send({ message: `All Staffs were deleted successfully!` });
  });
};
