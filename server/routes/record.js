const express = require("express");
const passport = require("passport");
const controller = require("../controllers/recordController");

const router = express.Router(); //create module router here

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getAll
);
router.post("/", controller.newRecord);
router.get("/:id", controller.getById);
router.put("/:id", controller.updRecord);
router.delete("/:id", controller.deleteRecord);

module.exports = router;
