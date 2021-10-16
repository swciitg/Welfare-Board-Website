/** @format */

const express = require("express");

const router = express.Router();
const saathiController = require("../controllers/saathi");
/* GET users listing. */
router.get("/", saathiController.aboutView);
router.post("/", saathiController.contactView);

module.exports = router;
