module.exports = app => {
  // List of available Routes
  require("../migrations/Routes")(app);
  app.use("/roles", require("./Roles"));
  app.use("/users", require("./Users"));
  app.use("/mailer", require("./Mailer"));
  app.use("/auth", require("./Auth"));
  app.use("/budgets", require("./Budgets"));
  app.use("/savings", require("./Savings"));
  app.use("/investments", require("./Investments"));
  app.use("/goals", require("./Goals"));
  app.use("/expenses", require("./Expenses"));
  app.use("/statistics", require("./Statistics"));
  app.use("/chats", require("./Chats"));
};
