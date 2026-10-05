 import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host                : 'localhost',
  user                : 'root',
  password            : 'LoveSQL1*',
  database            : 'libra_db',
  waitForConnections  : true
});

export default pool;