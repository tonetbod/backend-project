// // ========================================
// // POSTGRESQL DATABASE CONNECTION
// // ========================================

// const { Pool } = require("pg");

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "school_db",
//     password: "TOM",
//     port: 5432
// });

// module.exports = pool;


// ========================================
// POSTGRESQL DATABASE CONNECTION
// ========================================

const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false
});

// Test database connection
pool.on("connect", () => {
    console.log("PostgreSQL database connected successfully!");
});

pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL error:", err);
});

module.exports = pool;