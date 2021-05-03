const sql = require("./db.js");

/* CREATE TABLE IF NOT EXISTS roles(
    role_id INT PRIMARY KEY, 
    erp INT NOT NULL,
    role_name VARCHAR(20) NOT NULL,      
    -- role_desc VARCHAR(20),                REMOVING THIS
    FOREIGN KEY (erp) REFERENCES staff(erp)
); */

// constructor
const Roles = function (roles) {
  this.role_id = roles.role_id;
  this.erp = roles.erp;
  this.role_name = roles.role_name;
};

Roles.create = (newRole, result) => {
  sql.query("INSERT INTO roles SET ?", newRole, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("created role: ", { ...newRole });
    result(null, { ...newRole });
  });
};

Roles.findById = (role_id, result) => {
  sql.query(`SELECT * FROM roles WHERE role_id = ${role_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    if (res.length) {
      console.log("found roles: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Roles.getAll = (result) => {
  sql.query("SELECT * FROM roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("role: ", res);
    result(null, res);
  });
};

Roles.updateById = (role_id, newRole, result) => {
  sql.query(
    "UPDATE roles SET erp = ?, role_name = ? WHERE role_id = ?",
    [newRole.erp, newRole.role_name, role_id],
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

      console.log("updated role: ", { ...newRole });
      result(null, { role_id: role_id, ...newRole });
    }
  );
};

Roles.remove = (role_id, result) => {
  sql.query("DELETE FROM roles WHERE role_id = ?", role_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted staff with id: ", staff_erp);
    result(null, res);
  });
};

Roles.removeAll = (result) => {
  sql.query("DELETE FROM roles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} roles`);
    result(null, res);
  });
};

module.exports = Roles;
