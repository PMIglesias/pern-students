import React, { useState, useEffect } from "react";

import "./App.css";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    age: "",
    country: "",
    genre: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/students");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setStudents(data);
      setLoading(false); // Data fetching completed, set loading to false
    } catch (error) {
      console.error("Error fetching Students:", error);
      setLoading(false); // In case of error, still set loading to false to render the error message
    }
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setStudents((prevStudents) => [...prevStudents, data]);
      setFormData({ name: "", lastname: "", age: "", country: "", genre: "" });
    } catch (error) {
      console.error("Error creating Student:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      // Update the Students list by removing the deleted Students
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Error deleting Student:", error);
    }
  };

  if (loading) {
    return <div className="loading__spinner"></div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <h2>List of Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.lastname} - {student.age} -{" "}
            {student.country} - {student.genre}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
