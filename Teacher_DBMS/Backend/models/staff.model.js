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
const Staff = function (staff) {
  this.erp = staff.erp;
  this.dept_id = staff.dept_id;
  this.name = staff.name;
  this.password = staff.password;
  this.email_id = staff.email_id;
};

Staff.create = (newStaff, result) => {
  sql.query("INSERT INTO staff SET ?", newStaff, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("created staff: ", { ...newStaff });
    result(null, { ...newStaff });
  });
};

Staff.findById = (staff_erp, result) => {
  sql.query(`SELECT * FROM staff WHERE erp = ${staff_erp}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    if (res.length) {
      console.log("found staff: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Staff with the id
    result({ kind: "not_found" }, null);
  });
};

Staff.getAll = (result) => {
  sql.query("SELECT * FROM staff", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("staff: ", res);
    result(null, res);
  });
};

Staff.updateById = (staff_erp, newStaff, result) => {
  sql.query(
    "UPDATE staff SET dept_id = ?, name = ?, password = ?, email_id = ? WHERE erp = ?",
    [
      newStaff.dept_id,
      newStaff.name,
      newStaff.password,
      newStaff.email_id,
      staff_erp,
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

      console.log("updated staff: ", { ...newStaff });
      result(null, { erp: staff_erp, ...newStaff });
    }
  );
};

Staff.remove = (staff_erp, result) => {
  sql.query("DELETE FROM staff WHERE erp = ?", staff_erp, (err, res) => {
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

    console.log("deleted staff with id: ", res.affectedRows, staff_erp);
    result(null, res);
  });
};

Staff.removeAll = (result) => {
  sql.query("DELETE FROM staff", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log(`deleted ${res.affectedRows} staffs`);
    result(null, res);
  });
};

module.exports = Staff;
