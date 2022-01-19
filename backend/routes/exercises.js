/* eslint-disable no-console */
const express = require('express');
const pool = require('../db');
const systemLogger = require('../log/systemLogger');
const log = require('../log/constants');
const commonFunc = require('../common');

const router = express.Router();

const selectAll = 'SELECT id, name, is_aerobic FROM exercises;';
const addExercise = (name) =>
  `INSERT INTO exercises (name) VALUES ('${name}');`;
const deleteExercise = (name) =>
  `DELETE FROM exercises WHERE name = '${name}';`;

router.get('/api', (req, res) => {
  systemLogger.debug(log.DBG_MSG.QUERY_EXEC, selectAll);
  pool.query(selectAll, (error, results) => {
    systemLogger.debug(log.DBG_MSG.QUERY_RESULT, results);
    if (error) {
      console.log(error);
      res.status(400);
      res.json({ message: '取得に失敗しました。' });
    } else {
      res.status(200);
      res.json({
        message: '取得に成功しました。',
        results: results,
      });
    }
  });
});

router.post('/api', (req, res) => {
  systemLogger.debug(log.DBG_MSG.FUNC_EXEC, commonFunc.isOnlySpace.name);
  const temp = commonFunc.isOnlySpace(req.body.name);
  systemLogger.debug(log.DBG_MSG.FUNC_RESULT, temp);
  if (temp) {
    res.status(400);
    return res.json({ message: '文字を入力してください。' });
  }
  systemLogger.debug(log.DBG_MSG.QUERY_EXEC, addExercise(req.body.name));
  pool.query(addExercise(req.body.name), (error, results) => {
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

router.delete('/api', (req, res) => {
  systemLogger.debug(log.DBG_MSG.QUERY_EXEC, deleteExercise(req.body.name));
  pool.query(deleteExercise(req.body.name), (error, results) => {
    systemLogger.debug(log.DBG_MSG.QUERY_RESULT, results);
    if (error) {
      console.log(error);
      res.status(400);
      res.json({ message: '削除に失敗しました。' });
    } else {
      res.status(201);
      res.json({ message: '削除に成功しました。' });
    }
  });
});

module.exports = router;
