const router = require("express").Router(),
  { roles } = require("./Roles"),
  { users } = require("./Users");

module.exports = app => {
  app.use("/migrate", router.post("/roles", roles).post("/users", users));
};
