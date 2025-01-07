// File: tasktide-backend/utils/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Enable for Railway or similar platforms
    },
});

module.exports = pool;
