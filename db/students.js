const client = require("./client");

// function to get all Students
async function getAllStudents() {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM students;
            `);

    return rows;
  } catch (error) {
    throw error;
  }
}

// function to get an Student by id
async function getStudentById(id) {
  try {
    const {
      rows: [student],
    } = await client.query(
      `
            SELECT *
            FROM students
            WHERE id=$1;
            `,
      [id]
    );

    return student;
  } catch (error) {
    throw error;
  }
}

// function to create a new student
async function createStudent({ name, lastname, age, country, genre }) {
  try {
    const {
      rows: [student],
    } = await client.query(
      `
            INSERT INTO students(name, lastname, age, country, genre, created_at)
            VALUES ($1, $2, $3, $4, $5, NOW());
            `,
      [name, lastname, age, country, genre]
    );

    return student;
  } catch (error) {
    throw error;
  }
}

// function to update an student
async function updateStudent({ id, name, lastname, age, country, genre }) {
  try {
    const {
      rows: [student],
    } = await client.query(
      `
            UPDATE students
            SET name=$2, lastname=$3, age=$4, country=$5, genre=$6
            WHERE id=$1
            RETURNING *;
            `,
      [id, name, lastname, age, country, genre]
    );

    return student;
  } catch (error) {
    throw error;
  }
}

// function to delete an student
async function deleteStudent(id) {
  try {
    const {
      rows: [student],
    } = await client.query(
      `
            DELETE FROM students
            WHERE id=$1
            RETURNING *;
            `,
      [id]
    );

    return student;
  } catch (error) {
    throw error;
  }
}

// export modules
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
