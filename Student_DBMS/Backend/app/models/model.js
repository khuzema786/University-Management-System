const sql = require('../db.js');

const genericQueries = {
  create: 'INSERT INTO %name% SET ?',
  findById: 'SELECT * FROM %name% WHERE %primary% = ?',
  getAll: 'SELECT * FROM %name%',
  updateById: 'UPDATE %name% SET',
  remove: 'DELETE FROM %name% WHERE %primary% = ?',
  removeAll: 'DELETE FROM %name%'
};

/**
 * Decides all operations on courses
 */
class Table {
  /**
   * Creates a new instance of course parser
   * @param {String} table The table to consider for this instance
   * @param {Array<String>} fields all col_heads in table
   */
  constructor(table, fields) {
    this.tableName = table;
    this.fields = fields;
    fields.forEach((elem) => {
      this[elem] = elem;
    });
    this.queryList = this.generateQueries();
  }
  // We use in for objects. map for array.
  /**
   * Generates query command specific to table
   * @return {Object<String>} Mapped queries
   */
  generateQueries() {
    const allQuery = {};
    for (const query in genericQueries) {
      // !genericQueries.hasOwnProperty(query) to prevent accidental damage of code even if no query is present.
      if (!Object.prototype.hasOwnProperty.call(genericQueries, query)) continue;
      allQuery[query] = genericQueries[query]
        .replace('%name%', this.tableName)
        .replace('%primary%', this.fields[0])
        .trim();
    }
    return allQuery;
  }
  // let data = 'course_id';
  // -> this[data] -> this.course_id -> 6
  // {
  //   course_id: 6,
  //   name: 131,
  //   hasOwnProperty: (() => {sendIp() ...})
  // }

  /**
   * Sets session data
   * @param {Object} tab The main object
   */
  setData(tab) {
    for (const data in tab) {
      if (!Object.prototype.hasOwnProperty.call(tab, data)) continue;
      this[data] = tab[data]; // this.course_id = tab['course_id'] -> this.course_id = 6
    }
  }

  /**
   * Handles unexpected errors
   * @param {Object} err Main error to handle
   * @param {Function} callback To return to class
   * @return {Function} callback
   */
  errorHandler(err, callback) {
    console.log(`Error: ${err.message}`);
    console.error(err);
    return callback(err);
  }

  // {
  //   course_name: 'asfd',
  //   roll: 24
  // }
  // newData = [
  //   "`course_name` = 'asfd'",
  //   "`roll` = '24'"
  // ]
  // UPDATE courses SET `course_name` = 'asfd', `roll` = '24' WHERE course_id = ?

  /**
   * Generates a valid update statement based on data provided
   * @param {String} statement The update query pre-data upation
   * @param {Object<String>} data The new set of values to consider
   * @return {String} The compiled update statement
   */
  updateGenerator(statement, data) {
    const newData = [];
    for (const element in data) {
      if (!Object.prototype.hasOwnProperty.call(data, element)) continue;
      newData.push(`\`${element}\` = '${data[element]}'`);
    }
    return `${statement} ${newData.join(', ')} WHERE ${this.fields[0]} = ?`;
  }

  // this.fields = ['courseid', 'coursename']
  // data = {}
  // data['courseid'] = {this['courseid'] -> this.courseid = } 6;
  // data['coursename'] = 'lol';

  /**
   * Create a new instance of this database
   * @param {Function} result(error, response) callback to accept response
   * Generates a valid update statement based on data provided
   * @param {String} statement The update query pre-data upation
   * @param {Object<String>} data The new set of values to consider
   * @return {String} The compiled update statement
   */
  updateGenerator(statement, data) {
    const newData = [];
    for (const element in data) {
      if (!Object.prototype.hasOwnProperty.call(data, element)) continue;
      newData.push(`\`${element}\` = '${data[element]}'`);
    }
    return `${statement} ${newData.join(', ')} WHERE ${this.fields[0]} = ?`;
  }

  // this.fields = ['courseid', 'coursename']
  // data = {}
  // data['courseid'] = {this['courseid'] -> this.courseid = } 6;
  // data['coursename'] = 'lol';

  /**
   * Create a new instance of this database
   * @param {Function} result(error, response) callback to accept response
   */
  create(result) {
    const data = {};
    this.fields.forEach((e) => {
      data[e] = this[e];
    });
    sql.query(this.queryList.create, data, (err, res) => {
      if (err) this.errorHandler(err, result);
      else {
        console.log(`Created a new ${this.tableName} for ${data}`);
        result(null, data);
      }
    });
  }

  /**
   * Finds  out if an entry exists
   * @param {Number} id The id of the entry
   * @param {Function} result callback to accept response
   */
  findById(id, result) {
    sql.query(this.queryList.findById, id, (err, res) => {
      if (err) this.errorHandler(err, result);
      else {
        if (res.length) {
          console.log(`Found ${this.tableName}: ${res[0]}`);
          return result(null, res[0]);
        }
        return result(new Error('Not Found'));
      }
    });
  }

  /**
   * Find out all records
   * @param {Function} result callback to accept response
   */
  getAll(result) {
    sql.query(this.queryList.getAll, (err, res) => {
      if (err) this.errorHandler(err, result);
      else {
        console.log(`All ${this.tableName} are ${res}`);
        if (this.tableName === 'exam') {
          sql.query('CALL ins_exam()', (err, res) => {});
        }
        result(null, res);
      }
    });
  }

  /**
   * Updates data for a record
   * @param {Number} id The id of the entry
   * @param {Object} data New data to add
   * @param {Function} result callback to accept response
   */
  updateById(id, data, result) {
    const updateQuery = this.updateGenerator(this.queryList.updateById, data);
    sql.query(updateQuery, id, (err, res) => {
      if (err) this.errorHandler(err, result);
      else {
        if (res.affectedRows == 0) return result(new Error('Not Found'), null);
        console.log(`Updated ${this.tableName}: ${data}`);
        return result(null, data);
      }
    });
  }

  /**
   * Removes a record entry
   * @param {Number} id The id of the entry
   * @param {Function} result callback to accept response
   */
  remove(id, result) {
    sql.query(this.queryList.remove, id, (err, res) => {
      if (err) this.errorHandler(err, result);
      else {
        if (res.affectedRows == 0) return result(new Error('Not Found'), null);
        console.log(`Deleted ${this.tableName} with ID ${id}`);
        return result(null, res);
      }
    });
  }

  /**
   * Removes all records from database
   * @param {Function} result callback to accept response
   */
  removeAll(result) {
    sql.query(this.queryList.removeAll, (err, res) => {
      if (err) this.errorHandler(err, result);
      else {
        console.log(`Deleted ${res.affectedRows} ${this.tableName}`);
        return result(null, res);
      }
    });
  }
}

module.exports = Table;
