const Student = require("../models/student.model.js");

// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Student
    const stud = new Student({
        stud_erp: req.body.stud_erp,
        course_id: req.body.course_id,
        name: req.body.name,
        roll_no: req.body.roll_no,
    });

    // Save Student in the database
    Student.create(stud, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Student.",
            });
        else res.send(data);
    });
};

// Retrieve all Student from the database.
exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Student.",
            });
        else res.send(data);
    });
};

// Find a single Student with a StudentId
exports.findOne = (req, res) => {
    Student.findById(req.params.stud_erp, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.params.erp}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student with id " + req.params.erp,
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

    Student.findById(req.params.stud_erp, (err, oldData) => {
        console.log(oldData);
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.params.erp}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student with id " + req.params.erp,
                });
            }
        } else {
            const newData = req.body;
            for (element in oldData) {
                if (newData[element] == undefined) newData[element] = oldData[element];
            }
            Student.updateById(req.params.stud_erp, new Student(newData), (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found Student with erp ${req.params.erp}.`,
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating Student with erp " + req.params.erp,
                        });
                    }
                } else res.send(newData);
            });
        }
    });
};

// Delete a Student with the specified erp in the request
exports.delete = (req, res) => {
    Student.remove(req.params.stud_erp, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with erp ${req.params.erp}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Student with erp " + req.params.erp,
                });
            }
        } else res.send({ message: `Student was deleted successfully!` });
    });
};

// Delete all Student from the database.
exports.deleteAll = (req, res) => {
    Student.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students.",
            });
        else res.send({ message: `All Students were deleted successfully!` });
    });
};
