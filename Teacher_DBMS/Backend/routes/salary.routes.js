module.exports = (app) => {
  const salary = require("../controllers/salary.controller.js");

  app.post("/salary", salary.create);

  app.get("/salary", salary.findAll);

  app.get("/salary/:erp", salary.findOne);

  app.put("/salary/:erp", salary.update);

  app.delete("/salary/:erp", salary.delete);

  app.delete("/salary", salary.deleteAll);
};
