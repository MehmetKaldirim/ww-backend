const express = require("express");
const controller = require("../controllers/auth");

const router = express.Router(); //create module router here

router.get("/signin", controller.signin); // just pass - not call
router.get("/signup", controller.signup); // just pass - not call

module.exports = router;
