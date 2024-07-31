const router = require("express").Router(),
  { browse, bot, admin } = require("../controllers/Statistics"),
  { validate } = require("../middleware/jwt");

router
  .get("/users", validate, browse)
  .get("/bot", validate, bot)
  .get("/admin", admin);

module.exports = router;
