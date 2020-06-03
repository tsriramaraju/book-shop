//#region imports
const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");
//#endregion

router.get("/login", controller.getLogin);

router.post("/login", controller.postLogin);

router.post("/logout", controller.postLogout);

module.exports = router;
