const { Pool } = require('pg');

// requiring our hidden database connection string
require('dotenv').config({path: '../.env'});

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_SECRET
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
};