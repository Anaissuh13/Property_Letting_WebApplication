import mysql from'mysql2/promise' //import mysql2 promise wrapper

//create a pool
const pool=mysql.createPool({
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATABASE,
})

export default pool//export for use in API routes
