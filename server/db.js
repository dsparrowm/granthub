const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.warn('WARNING: DATABASE_URL is not set. DB calls will fail until it is configured.');
}

const pool = new Pool({ connectionString });

module.exports = pool;
