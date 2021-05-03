module.exports = (app) => {
  const roles = require("../controllers/roles.controller.js");

  app.post("/roles", roles.create);

  app.get("/roles", roles.findAll);

  app.get("/roles/:role_id", roles.findOne);

  app.put("/roles/:role_id", roles.update);

  app.delete("/roles/:role_id", roles.delete);

  app.delete("/roles", roles.deleteAll);
};
