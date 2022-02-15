const express = require('express');
const pool = require('../db');
const systemLogger = require('../log/systemLogger');
const log = require('../log/constants');
const createValue = require('../util/createValue');

const router = express.Router();

const recordsType = {
  exercise_date: 'date',
  exercise: 'varchar',
  weight_kg: 'decimal',
  weight_lb: 'decimal',
  repetition: 'int',
  is_supported: 'tinyint',
  left_or_right: 'varchar',
  distance_km: 'decimal',
  distance_mile: 'decimal',
  run_time: 'time',
  memo: 'varchar',
};

const addRecord = (colName, value) => `INSERT INTO records (${colName}) VALUES (${value});`;

router.post('/api', (req, res) => {
  const colName = Object.keys(req.body).join(',');
  systemLogger.debug(log.DBG_MSG.FUNC_EXEC, createValue.name);
  systemLogger.debug(log.DBG_MSG.FUNC_RESULT, createValue(req.body, recordsType));
  const value = createValue(req.body, recordsType);
  systemLogger.debug(log.DBG_MSG.QUERY_EXEC, addRecord(colName, value));
  pool.query(addRecord(colName, value), (error, results) => {
    systemLogger.debug(log.DBG_MSG.QUERY_RESULT, results);
    if (error) {
      systemLogger.error(error);
      res.status(400);
      return res.json({ message: '登録に失敗しました。' });
    } else {
      res.status(201);
      return res.json({ message: '登録に成功しました。' });
    }
  });
});

module.exports = router;
