module.exports = (app) => {
  const attendance = require("../controllers/attendance.controller.js");

  app.get("/attendance", attendance.findAll);

  app.get("/attendance/:erp", attendance.findOne);

  app.put("/attendance/:erp", attendance.update);

  app.delete("/attendance/:erp", attendance.delete);

  app.delete("/attendance", attendance.deleteAll);
};
