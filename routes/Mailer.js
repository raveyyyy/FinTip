const router = require("express").Router(),
  { sendLink, sendCode, forgotPassword } = require("../controllers/Mailer");

router
  .post("/link", sendLink)
  .post("/code", sendCode)
  .post("/forgot-password", forgotPassword);

module.exports = router;
