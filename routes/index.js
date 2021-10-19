const express = require("express");

const router = express.Router();
const userRouter = require("./users");

const indexController = require("../controllers/index");
 const homeController= require("../controllers/homepage");

/* GET CONTROLLER */
router.get("/welfare", homeController.homeView);
router.get("/", indexController.indexView);

//= ==================================== DECLARE ALL YOUR ROUTERS HERE ==================================

router.use("/users", userRouter);
module.exports = router;
