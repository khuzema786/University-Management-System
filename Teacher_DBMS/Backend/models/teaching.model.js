const sql = require("./db.js");

/* CREATE TABLE IF NOT EXISTS teaching_staff(
    erp INT PRIMARY KEY,					-- PK
    -- email_id VARCHAR(20), 					-- FK
    course_id INT NOT NULL,
    designation VARCHAR(20) NOT NULL,
	-- FOREIGN KEY (email_id) REFERENCES staff(email_id),
	FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
 */

// constructor
const teaching = function (teaching) {
  this.erp = teaching.erp;
  this.course_id = teaching.course_id;
  this.designation = teaching.designation;
};

teaching.create = (newteaching, result) => {
  sql.query("INSERT INTO teaching_staff SET ?", newteaching, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      console.log(res);
      return;
    }

    console.log("created teaching: ", newteaching);
    result(null, newteaching);
  });
  // Procedure to be called to increment salary by 25%
    sql.query("CALL inc_sal()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
    }
  });
};

teaching.findById = (erp, result) => {
  sql.query(`SELECT * FROM teaching_staff WHERE erp = ${erp}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found teaching: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found teaching with the id
    result({ kind: "not_found" }, null);
  });
};

teaching.getAll = (result) => {
  sql.query("SELECT * FROM teaching_staff", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("teaching: ", res);
    result(null, res);
  });
};

teaching.updateById = (erp, newteaching, result) => {
  sql.query(
    "UPDATE teaching_staff SET course_id = ?, designation = ? WHERE erp = ?",
    [newteaching.course_id, newteaching.designation, erp],
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

      console.log("updated staff: ", { ...newteaching });
      result(null, { erp: erp, ...newteaching });
    }
  );
};

teaching.remove = (erp, result) => {
  sql.query("DELETE FROM teaching_staff WHERE erp = ?", erp, (err, res) => {
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

    console.log("deleted teaching staff with erp: ", res.affectedRows, erp);
    result(null, res);
  });
};

teaching.removeAll = (result) => {
  sql.query("DELETE FROM teaching_staff", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log(`deleted ${res.affectedRows} teaching staffs`);
    result(null, res);
  });
};

module.exports = teaching;
