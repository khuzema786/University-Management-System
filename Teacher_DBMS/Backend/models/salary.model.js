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
const Salary = function (salary) {
  this.erp = salary.erp;
  this.provident_fund = salary.provident_fund;
  this.net_amt = salary.net_amt;
};

Salary.create = (newSalary, result) => {
  sql.query("INSERT INTO salary SET ?", newSalary, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("created Salary: ", newSalary);
    result(null, newSalary);
  });
};

Salary.findById = (erp, result) => {
  sql.query(`SELECT * FROM Salary WHERE erp = ${erp}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    if (res.length) {
      console.log("found Salary: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Staff with the id
    result({ kind: "not_found" }, null);
  });
};

Salary.getAll = (result) => {
  sql.query("SELECT * FROM salary", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("Salary: ", res);
    result(null, res);
  });
};

Salary.updateById = (erp, newSalary, result) => {
  sql.query(
    "UPDATE salary SET provident_fund = ?, net_amt = ? WHERE erp = ?",
    [newSalary.provident_fund, newSalary.net_amt, erp],
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

      console.log("updated Salary: ", { ...newSalary });
      result(null, { erp: erp, ...newSalary });
    }
  );
};

Salary.remove = (erp, result) => {
  sql.query("DELETE FROM Salary WHERE erp = ?", erp, (err, res) => {
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

    console.log("deleted Salary with erp: ", res.affectedRows, erp);
    result(null, res);
  });
};

Salary.removeAll = (result) => {
  sql.query("DELETE FROM Salary", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Salary`);
    result(null, res);
  });
};

module.exports = Salary;
