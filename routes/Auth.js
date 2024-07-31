const router = require("express").Router(),
  { login, provideAuth, upload, verifyLogin } = require("../controllers/Auth"),
  { validate } = require("../middleware/jwt");

router
  .get("/login", login)
  //   .get("/changePassword", provideToken)
  .get("/validateRefresh", validate, provideAuth)
  .get("/verifyCode", validate, verifyLogin)
  .post("/upload", validate, upload);

module.exports = router;
