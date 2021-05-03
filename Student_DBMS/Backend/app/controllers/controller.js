const fs = require('fs');
const path = require('path');

const TableHandler = require('../models/model.js');
const Command = require('./baseFunctions.js');

const fieldList = JSON.parse(fs.readFileSync(path.join(__dirname, './fields.json'))); // To read JSON Files

function generateMethods(tableName) {
  const Table = new TableHandler(tableName, fieldList[tableName]); // course model
  return new Command(Table);
}

module.exports = {
  generateMethods
};
