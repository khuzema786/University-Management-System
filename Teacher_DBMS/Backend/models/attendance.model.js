const sql = require("./db.js");

/*
CREATE TABLE IF NOT EXISTS attendance(
    attendance_id INT PRIMARY KEY, --PK
    erp INT NOT NULL, --FK
    meetings_attended INT NOT NULL DEFAULT 0,
    days_attended INT NOT NULL DEFAULT 0,
    FOREIGN KEY(erp) REFERENCES staff(erp)
);
*/

// constructor
const Attendance = function (attendance) {
  this.attendance_id = attendance.attendance_id;
  this.erp = attendance.erp;
  this.meetings_attended = attendance.meetings_attended;
  this.days_attended = attendance.days_attended;
};

// No create method needed as we initialize it using trigger

Attendance.findById = (id, result) => {
  sql.query(
    `SELECT * FROM attendance WHERE attendance_id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.length) {
        console.log("found attendance: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Staff with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Attendance.getAll = (result) => {
  sql.query("SELECT * FROM attendance", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("attendance: ", res);
    result(null, res);
  });
};

Attendance.updateById = (id, newAttendance, result) => {
  sql.query(
    "UPDATE attendance SET erp = ?, meetings_attended = ?, days_attended = ? WHERE attendance_id = ?",
    [
      newAttendance.erp,
      newAttendance.meetings_attended,
      newAttendance.days_attended,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated attendance: ", { ...newAttendance });
      result(null, { attendance_id: id, ...newAttendance });
    }
  );
};
// Remove this
Attendance.remove = (id, result) => {
  sql.query(
    "DELETE FROM attendance WHERE attendance_id = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Staff with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted attendance with id: ", res.affectedRows, id);
      result(null, res);
    }
  );
};
// Reomve This
Attendance.removeAll = (result) => {
  sql.query("DELETE FROM attendance", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log(`deleted ${res.affectedRows} attendance`);
    result(null, res);
  });
};

module.exports = Attendance;
