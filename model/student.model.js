const { DataTypes } = require("sequelize");
const { sequelizeConn } = require("./conn");

const Student = sequelizeConn.define(
  "student",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["male", "female"]],
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Student;
