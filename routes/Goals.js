const router = require("express").Router(),
  { browse, save, update, destroy, find } = require("../controllers/Goals"),
  { validate } = require("../middleware/jwt");

router
  .get("/", validate, browse)
  .get("/find", validate, find)
  .post("/save", validate, save)
  .put("/update", validate, update)
  .delete("/destroy", validate, destroy);

module.exports = router;
