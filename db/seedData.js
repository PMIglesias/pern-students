const client = require("./client");

// import functions to create initial data
const { createStudent } = require("./students");

// function to drop all tables
async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
            DROP TABLE IF EXISTS learners;
            `);
    console.log("Finished dropping tables!");
  } catch (error) {
    throw error;
  }
}

// function to create all tables
async function createTables() {
  try {
    console.log("Starting to build tables...");
    // build autos table with id, year, brand, and model
    await client.query(`
            CREATE TABLE students (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                age INTEGER NOT NULL,
                country VARCHAR(255) NOT NULL,
                genre VARCHAR(255) NOT NULL,
                created_at TIMESTAMP,
                updated_at TIMESTAMP
            );
            `);
    console.log("Finished building tables!");
  } catch (error) {
    throw error;
  }
}

// function to create initial data
async function createInitialData() {
  try {
    console.log("Starting to create initial data...");
    // create student data
    await createStudent({
      name: "Javier",
      lastname: "Lavin",
      age: 30,
      country: "USA",
      genre: "male",
    });
    await createStudent({
      name: "Gulzaib",
      lastname: "Ahmad",
      age: 30,
      country: "Pakistan",
      genre: "male",
    });
    await createStudent({
      name: "Robyn",
      lastname: "Jhonson",
      age: 30,
      country: "USA",
      genre: "female",
    });
    await createStudent({
      name: "Pablo",
      lastname: "Iglesias",
      age: 43,
      country: "Argentina",
      genre: "male",
    });
    console.log("Finished creating initial data!");
  } catch (error) {
    throw error;
  }
}

// function to rebuild database
async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
