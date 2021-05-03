const sql = require("./db.js");

/* CREATE TABLE IF NOT EXISTS roles(
    role_id INT PRIMARY KEY, 
    erp INT NOT NULL,
    role_name VARCHAR(20) NOT NULL,      
    -- role_desc VARCHAR(20),                REMOVING THIS
    FOREIGN KEY (erp) REFERENCES staff(erp)
); */

// constructor
const Courses = function (courses) {
  this.course_id = courses.course_id;
  this.course_name = courses.course_name;
  this.completion_time = courses.completion_time;
};

Courses.create = (newCourses, result) => {
  sql.query("INSERT INTO courses SET ?", newCourses, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("created Course: ", { ...newCourses });
    result(null, { ...newCourses });
  });
};

Courses.findById = (course_id, result) => {
  sql.query(
    `SELECT * FROM courses WHERE course_id = ${course_id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.length) {
        console.log("found Courses: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Courses.getAll = (result) => {
  sql.query("SELECT * FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("Courses: ", res);
    result(null, res);
  });
};

Courses.updateById = (course_id, newCourses, result) => {
  sql.query(
    "UPDATE courses SET course_name = ?, completion_time = ? WHERE course_id = ?",
    [newCourses.course_name, newCourses.completion_time, course_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Courses: ", { ...newCourses });
      result(null, { course_id: course_id, ...newCourses });
    }
  );
};

Courses.remove = (course_id, result) => {
  sql.query(
    "DELETE FROM courses WHERE course_id = ?",
    course_id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted courses with id: ", course_id);
      result(null, res);
    }
  );
};

Courses.removeAll = (result) => {
  sql.query("DELETE FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} courses`);
    result(null, res);
  });
};

module.exports = Courses;
