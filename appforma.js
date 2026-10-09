//TEST NODE.JS + EXPRESS ONLY

const express = require("express");

const app = express();

const PORT = 3000;

// Home route
app.get("/", (req, res) => {
    res.send("Node.js + Express is working!");
});

// Students route - using sample data instead of PostgreSQL
app.get("/students", (req, res) => {

    const students = [
        {
            id: 1,
            name: "John",
            age: 15,
            course: "Web Development"
        },
        {
            id: 2,
            name: "Mary",
            age: 14,
            course: "JavaScript"
        },
        {
            id: 3,
            name: "David",
            age: 16,
            course: "Node.js"
        }
    ];

    res.json(students);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
