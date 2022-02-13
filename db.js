const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "33416738aA",
    host: "localhost",
    port: 5432,
    database: "quizrat"
})


module.exports = pool;