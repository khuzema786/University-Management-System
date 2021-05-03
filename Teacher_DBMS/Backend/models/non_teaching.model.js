const sql = require("./db.js");

/* Table -> CREATE TABLE IF NOT EXISTS staff(	 
    erp INT(12) PRIMARY KEY,
    dept_id INT NOT NULL,	
    name VARCHAR(20) NOT NULL,		
    password VARCHAR(20) NOT NULL,
    email_id VARCHAR(30) NOT NULL UNIQUE,   
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
); */

// constructor
const Non_teaching = function (non_teaching) {
  this.erp = non_teaching.erp;
  this.classification = non_teaching.classification;
};

Non_teaching.create = (newNon_teaching, result) => {
  sql.query(
    "INSERT INTO non_teaching_staff SET ?",
    newNon_teaching,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      console.log("created non_teaching staff: ", { ...newNon_teaching });
      result(null, newNon_teaching);
    }
  );
};

Non_teaching.findById = (erp, result) => {
  sql.query(
    `SELECT * FROM non_teaching_staff WHERE erp = ${erp}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.length) {
        console.log("found non_teaching staff: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Staff with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Non_teaching.getAll = (result) => {
  sql.query("SELECT * FROM non_teaching_staff", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("non_teaching staff: ", res);
    result(null, res);
  });
};

Non_teaching.updateById = (erp, newNon_teaching, result) => {
  sql.query(
    "UPDATE non_teaching_staff SET classification = ? WHERE erp = ?",
    [newNon_teaching.classification, erp],
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

      console.log("updated non_teaching staff: ", { ...newNon_teaching });
      result(null, { erp: erp, ...newNon_teaching });
    }
  );
};

Non_teaching.remove = (erp, result) => {
  sql.query("DELETE FROM non_teaching_staff WHERE erp = ?", erp, (err, res) => {
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

    console.log("deleted non_teaching staff with erp: ", res.affectedRows, erp);
    result(null, res);
  });
};

Non_teaching.removeAll = (result) => {
  sql.query("DELETE FROM non_teaching_staff", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log(`deleted ${res.affectedRows} non_teaching staff`);
    result(null, res);
  });
};

module.exports = Non_teaching;
