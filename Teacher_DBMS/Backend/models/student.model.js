const sql = require("./db.js");

/*
CREATE TABLE IF NOT EXISTS student(
    stud_erp INT PRIMARY KEY,		-- PK
    course_id INT NOT NULL,			-- FK
    name VARCHAR(20) NOT NULL,
    roll_no INT NOT NULL UNIQUE,
	FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
); 
*/

// constructor
const Student = function (student) {
  this.stud_erp = student.stud_erp;
  this.course_id = student.course_id;
  this.name = student.name;
  this.roll_no = student.roll_no;
};

Student.create = (newStud, result) => {
  sql.query("INSERT INTO student SET ?", newStud, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("created stud: ", newStud);
    result(null, newStud);
  });
};

Student.findById = (stud_erp, result) => {
  sql.query(
    `SELECT * FROM student WHERE stud_erp = ${stud_erp}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.length) {
        console.log("found stud: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found stud with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Student.getAll = (result) => {
  sql.query("SELECT * FROM student", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("stud: ", res);
    result(null, res);
  });
};

Student.updateById = (stud_erp, newStud, result) => {
  sql.query(
    "UPDATE student SET course_id = ?, name = ?, roll_no = ? WHERE stud_erp = ?",
    [newStud.course_id, newStud.name, newStud.roll_no, stud_erp],
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

      console.log("updated stud: ", { ...newStud });
      result(null, { erp: stud_erp, ...newStud });
    }
  );
};

Student.remove = (stud_erp, result) => {
  sql.query("DELETE FROM student WHERE stud_erp = ?", stud_erp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found stud with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stud with id: ", res.affectedRows, stud_erp);
    result(null, res);
  });
};

Student.removeAll = (result) => {
  sql.query("DELETE FROM student", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log(`deleted ${res.affectedRows} studs`);
    result(null, res);
  });
};

module.exports = Student;
