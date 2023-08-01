const express = require("express");
const router = express.Router();

const client = require("../db/client");

// ROUTER: /api/students
const studentsRouter = require("./students");
router.use("/students", studentsRouter);

module.exports = router;
