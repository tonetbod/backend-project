const { Pool } = require("pg");

const jdbase = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = jdbase;