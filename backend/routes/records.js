const express = require('express');
const pool = require('../db');
const systemLogger = require('../log/systemLogger');
const log = require('../log/constants');
const addSingleQuote = require('../util/addSingleQuote');
const needsQuote = require('../util/needsQuote');

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

const addRecord = (colList, valList) =>
  `INSERT INTO records (${colList}) VALUES (${valList});`;

router.post('/api', (req, res) => {
  const colList = Object.keys(req.body).join(',');
  const valList = Object.keys(req.body)
    .map((key) => {
      console.log(key + ':' + req.body[key] + ':' + recordsType[key]);
      if (req.body[key] !== false && !req.body[key]) {
        return 'null';
      }
      if (needsQuote(recordsType[key])) {
        return addSingleQuote(req.body[key]);
      } else {
        return req.body[key];
      }
    })
    .join(',');
  systemLogger.debug(log.DBG_MSG.QUERY_EXEC, addRecord(colList, valList));
  pool.query(addRecord(colList, valList), (error, results) => {
    systemLogger.debug(log.DBG_MSG.QUERY_RESULT, results);
    if (error) {
      console.log(error);
      res.status(400);
      return res.json({ message: '登録に失敗しました。' });
    } else {
      res.status(201);
      return res.json({ message: '登録に成功しました。' });
    }
  });
});

module.exports = router;
