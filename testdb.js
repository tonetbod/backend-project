const { Pool } = require("pg");

console.log("Starting database test...");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "school_db",
    password: "TOM",
    port: 5433,

    // Don't wait forever if PostgreSQL cannot be reached
    connectionTimeoutMillis: 5000
});

console.log("Trying to connect to PostgreSQL...");

pool.query("SELECT * FROM students ORDER BY id ASC", (error, result) => {

    if (error) {

        console.error("❌ DATABASE ERROR:");
        console.error(error.message);

        pool.end();

        return;
    }

    console.log("✅ DATABASE CONNECTION WORKS!");

    console.table(result.rows);

    pool.end();
});