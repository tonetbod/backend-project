// Import Express
const express = require("express");

// Create an Express application
const app = express();

// Port number
const PORT = 3000;

// Middleware
// Allows Express to understand JSON data sent in requests
app.use(express.json());


// =====================================================
// TEMPORARY STUDENT DATA
// =====================================================

let students = [
    {
        id: 1,
        name: "Mary",
        age: 12,
        course: "Node.js"
    },
    {
        id: 2,
        name: "John",
        age: 14,
        course: "JavaScript"
    },
    {
        id: 3,
        name: "Sarah",
        age: 13,
        course: "HTML and CSS"
    }
];


// =====================================================
// GET REQUEST
// =====================================================

// Route: GET /students
// Used to get all students

app.get("/students", (req, res) => {

    res.json(students);

});


// =====================================================
// GET ONE STUDENT
// =====================================================

// Route: GET /students/:id
// :id is a route parameter

app.get("/students/:id", (req, res) => {

    // Get the ID from the URL
    const id = Number(req.params.id);

    // Find the student
    const student = students.find(student => student.id === id);

    // Check if student exists
    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Send student information
    res.json(student);

});


// =====================================================
// POST REQUEST
// =====================================================

// Route: POST /students
// Used to create a new student

app.post("/students", (req, res) => {

    // Get data sent by the client
    const { name, age, course } = req.body;

    // Create a new student
    const newStudent = {
        id: students.length + 1,
        name: name,
        age: age,
        course: course
    };

    // Add student to the array
    students.push(newStudent);

    // Send response
    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });

});


// =====================================================
// PUT REQUEST
// =====================================================

// Route: PUT /students/:id
// Used to update an existing student

app.put("/students/:id", (req, res) => {

    // Get ID from URL
    const id = Number(req.params.id);

    // Find the student
    const student = students.find(student => student.id === id);

    // If student does not exist
    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Get new data from request body
    const { name, age, course } = req.body;

    // Update student information
    student.name = name;
    student.age = age;
    student.course = course;

    // Send response
    res.json({
        message: "Student updated successfully",
        student: student
    });

});


// =====================================================
// DELETE REQUEST
// =====================================================

// Route: DELETE /students/:id
// Used to delete a student

app.delete("/students/:id", (req, res) => {

    // Get ID from URL
    const id = Number(req.params.id);

    // Find the position of the student
    const studentIndex = students.findIndex(
        student => student.id === id
    );

    // If student does not exist
    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    // Remove the student
    const deletedStudent = students.splice(studentIndex, 1);

    // Send response
    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });

});


// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.send(`
        <h1>Node.js HTTP Methods</h1>

        <p>Available routes:</p>

        <ul>
            <li>GET /students</li>
            <li>GET /students/:id</li>
            <li>POST /students</li>
            <li>PUT /students/:id</li>
            <li>DELETE /students/:id</li>
        </ul>
    `);

});


// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});