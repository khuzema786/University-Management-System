/**
 * Handles all responses to backend
 */
class Command {
  /**
   * New Instance of command parser
   * @param {Object} parser The Table to access
   */
  constructor(parser) {
    this.parser = parser;
    this.base = {
      success: false,
      message: ''
    };
    // model.js -> Table -> Courses(Table)
    // basefunc.js -> Command -> Courses(Command)
    // Courses(Command).parser = Courses(Table)
  }

  /**
   * Creates a new instance of Table
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  create(req, res) {
    if (!req.body) {
      this.base.success = false;
      this.base.message = 'Content can not be empty!';
      res.status(400).send(this.base);
    } else {
      this.parser.setData(req.body);

      this.parser.create((err, data) => {
        if (err) {
          this.base.success = false;
          this.base.message = err.message || `Some error occurred while creating entry for ${this.parser.name}.`;
          res.status(500).send(this.base);
        } else {
          this.base.success = true;
          this.base.message = data;
          res.send(this.base);
        }
      });
    }
  }

  /**
   * Finds all records in db
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  findAll(req, res) {
    console.log(this);
    if (this.parser === undefined) {
      this.base.success = false;
      this.base.message = 'Database has not been initialized';
      res.status(400).send(this.base);
    } else {
      this.parser.getAll((err, data) => {
        if (err) {
          this.base.success = false;
          this.base.message = err.message || `Some error occurred while retrieving ${this.parser.name}.`;
          res.status(500).send(this.base);
        } else {
          this.base.message = data;
          this.base.success = true;
          res.send(this.base);
        }
      });
    }
  }

  /**
   * Finds all records in db
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  findOne(req, res) {
    if (this.parser === undefined) {
      this.base.success = false;
      this.base.message = 'Database has not been initialized';
      res.status(400).send(this.base);
    } else {
      this.parser.findById(req.params[this.parser.fields[0]], (err, data) => {
        if (err) {
          this.base.success = false;
          this.base.message = err.message || `Error in retrieving this ${this.parser.name}.`;
          res.status(500).send(this.base);
        } else {
          this.base.message = data;
          this.base.success = true;
          res.send(this.base);
        }
      });
    }
  }

  /**
   * Updates a database record
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  update(req, res) {
    if (this.parser === undefined) {
      this.base.success = false;
      this.base.message = 'Database has not been initialized';
      res.status(400).send(this.base);
    } else if (!req.body) {
      this.base.success = false;
      this.base.message = 'Content can not be empty!';
      res.status(404).send(this.base);
    } else {
      // req.params { course_id: 1006}
      // [course_id, name ...]
      // req.param[course_id] => 1006
      this.parser.updateById(req.params[this.parser.fields[0]], req.body, (err, data) => {
        if (err) {
          this.base.success = false;
          this.base.message = err.message || `This ${this.parser.name} may not exist.`;
          res.status(500).send(this.base);
        } else {
          this.base.message = data;
          this.base.success = true;
          res.send(this.base);
        }
      });
    }
  }

  /**
   * Deletes a record
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  deleteOne(req, res) {
    if (this.parser === undefined) {
      this.base.success = false;
      this.base.message = 'Database has not been initialized';
      res.status(400).send(this.base);
    } else {
      this.parser.remove(req.params[this.parser.fields[0]], (err, data) => {
        if (err) {
          this.base.success = false;
          this.base.message = err.message || `This ${this.parser.name} could not be deleted.`;
          res.status(500).send(this.base);
        } else {
          this.base.message = data;
          this.base.success = true;
          res.send(this.base);
        }
      });
    }
  }

  /**
   * Deletes all records
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   */
  deleteAll(req, res) {
    if (this.parser === undefined) {
      this.base.success = false;
      this.base.message = 'Database has not been initialized';
      res.status(400).send(this.base);
    } else {
      this.parser.removeAll((err, data) => {
        if (err) {
          this.base.success = false;
          this.base.message = err.message || `${this.parser.name} could not be accessed.`;
          res.status(500).send(this.base);
        } else {
          this.base.message = data;
          this.base.success = true;
          res.send(this.base);
        }
      });
    }
  }
}

module.exports = Command;
