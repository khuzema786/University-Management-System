const sql = require("./db.js");
//CREATE TABLE IF NOT EXISTS department(  -- NO FK
//    dept_id INT PRIMARY KEY,			-- PK
//    name VARCHAR(20) NOT NULL
//);
const department = function (department) {
  this.dept_id = department.dept_id;
  this.name = department.name;
};

department.create = (new_depart, result) => {
  sql.query("INSERT INTO department SET ?", new_depart, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("created department: ", new_depart);
    result(null, new_depart);
  });
};

department.findById = (dept_id, result) => {
  sql.query(
    `SELECT * FROM department WHERE dept_id = ${dept_id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.length) {
        console.log("found department: ", res[0]);
        result(null, res[0]);
        return;
      }

      //not found Staff with id
      result({ kind: "not_found" }, null);
    }
  );
};

department.getAll = (result) => {
  sql.query("SELECT * FROM department", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("department: ", res);
    result(null, res);
  });
};

department.updateById = (dept_id, new_depart, result) => {
  sql.query(
    "UPDATE department SET name = ? where dept_id = ?",
    [new_depart.name, dept_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated department: ", { ...new_depart });
      result(null, { dept_id: dept_id, ...new_depart });
    }
  );
};

department.remove = (dept_id, result) => {
  sql.query("DELETE FROM department WHERE dept_id = ?", dept_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not found" }, null);
      return;
    }
    console.log("deletion successful");
    result(null, res);
  });
};

department.removeAll = (result) => {
  sql.query("DELETE FROM department", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("deletion all");
    result(null, res);
  });
};

module.exports = department;
