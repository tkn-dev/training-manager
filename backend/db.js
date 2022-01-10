const mysql = require('mysql2');
const systemLogger = require('./log/systemLogger');
const log = require('./log/constants');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'training_manager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
systemLogger.info(log.INF_MSG.DB_CONNECTED);

module.exports = pool;
