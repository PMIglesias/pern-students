const Student = require("./student.model");

// get all Students
const getAllStudent = async () => {
  const result = await Student.findAll();
  return result;
};

// get an Student by id
const getStudentById = async (id) => {
  const result = await Student.findAll({
    where: {
      id,
    },
  });

  return result;
};

// create a new Student
const createStudent = async ({ name, lastname, age, country, genre }) => {
  try {
    const result = await Student.create({
      name,
      lastname,
      age,
      country,
      genre,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateStudent = async ({ id, name, lastname, age, country, genre }) => {
  try {
    const Student = await getStudentById(id);

    if (!Student || Student.length === 0) {
      throw new Error(`Unable to find Student with ID: ${id}`);
    }

    await Student.update(
      {
        name,
        lastname,
        age,
        country,
        genre,
      },
      {
        where: {
          id,
        },
      }
    );

    return await getStudentById(id);
  } catch (err) {
    throw err;
  }
};

const deleteStudent = async (id) => {
  const StudentToDelete = await getStudentById(id);

  if (!StudentToDelete || StudentToDelete.length === 0) {
    throw new Error(`Could not find an Student with the ID ${id} to delete`);
  }

  await Student.destroy({
    where: {
      id,
    },
  });

  return StudentToDelete[0];
};

module.exports = {
  getAllStudent,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
