const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
// const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../db');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../model");

// GET - /api/students - returns a list of students - PUBLIC
router.get("/", async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.send(students);
  } catch (error) {
    next(error);
  }
});

// GET - /api/students/:id - returns a single student by id - PUBLIC
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await getStudentById(id);

    if (student && student.length) {
      res.send(student);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .send(`Couldn't find student with ID: ${id}`);
    }
  } catch (error) {
    next(error);
  }
});

// POST - /api/students - creates a new student - PUBLIC
router.post("/", async (req, res, next) => {
  const { name, lastname, age, country, genre } = req.body;

  try {
    const student = await createStudent({
      name,
      lastname,
      age,
      country,
      genre,
    });

    res.send(student);
  } catch (error) {
    // res.status(StatusCodes.BAD_REQUEST).send(`Bad Request. Try again.`)
    next(error);
  }
});

// PATCH - /api/students/:id - updates an student by id - PUBLIC
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, lastname, age, country, genre } = req.body;

  try {
    const student = await updateStudent({
      id,
      name,
      lastname,
      age,
      country,
      genre,
    });

    res.send(student);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/students/:id - deletes an student by id - PUBLIC
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const student = await deleteStudent(id); // Pass the ID directly, not as an object

    res.send(student);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
