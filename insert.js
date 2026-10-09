// ========================================
// INSERT SERVER
// ========================================

const express = require("express");
const pool = require("./db");

const app = express();


// Allow Express to receive JSON
app.use(express.json());

// Serve files from the public folder
app.use(express.static("public"));

const PORT = 4000;


// ========================================
// TEST DATABASE CONNECTION
// ========================================

app.get("/test", async (req, res) => {
    try {

        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Insert server and PostgreSQL are connected",
            time: result.rows[0]
        });

    } catch (error) {

        console.error("DATABASE ERROR:", error.message);

        res.status(500).json({
            message: "Database connection failed",
            error: error.message
        });
    }
});


// ========================================
// POST STUDENT
// ========================================

app.post("/students", async (req, res) => {
    try {

        // Get student data from the form
        const { name, age, course, email } = req.body;

        console.log("Student received:", req.body);

        // Insert student into PostgreSQL
        const result = await pool.query(
            `INSERT INTO students (name, age, course, email)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name, age, course, email]
        );

        console.log("Student inserted:", result.rows[0]);

        res.status(201).json({
            message: "Student record added successfully",
            student: result.rows[0]
        });

    } catch (error) {

        console.error("INSERT ERROR:", error.message);

        res.status(500).json({
            message: "Student was not inserted",
            error: error.message
        });
    }
});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
    console.log(`Insert server running at http://localhost:${PORT}`);
});


