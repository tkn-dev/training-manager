const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const systemLogger = require('./log/systemLogger');
const log = require('./log/constants');

const database = 'training_manager';
const host = 'localhost';
const user = 'root';
const password = null;

const pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
systemLogger.info(log.INF_MSG.DB_CONNECTED);

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  timezone: '+09:00',
  logging: (log) => {
    systemLogger.debug(log);
  },
});

exports.pool = pool;
exports.sequelize = sequelize;
