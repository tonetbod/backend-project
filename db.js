// ========================================
// POSTGRESQL DATABASE CONNECTION
// ========================================

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "school_db",
    password: "TOM",
    port: 5432
});

module.exports = pool;