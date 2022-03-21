/* eslint-disable no-console */
const express = require('express');
const { pool } = require('../db');
const systemLogger = require('../log/systemLogger');
const log = require('../log/constants');
const isOnlySpace = require('../util/isOnlySpace');
const createValue = require('../util/createValue');

const router = express.Router();

const exercisesType = {
  name: 'varchar',
  is_aerobic: 'tinyint',
};

const selectAll = () => 'SELECT id, name, is_aerobic FROM exercises;';
const addExercise = (colName, value) => `INSERT INTO exercises (${colName}) VALUES (${value});`;
const deleteExercise = (name) => `DELETE FROM exercises WHERE name = '${name}';`;

router.get('/get/all', (req, res) => {
  systemLogger.debug(log.DBG_MSG.QUERY_EXEC, selectAll());
  pool.query(selectAll(), (error, results) => {
    systemLogger.debug(log.DBG_MSG.QUERY_RESULT, results);
    if (error) {
      systemLogger.error(error);
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

router.post('/new', (req, res) => {
  systemLogger.debug(log.DBG_MSG.FUNC_EXEC, isOnlySpace.name);
  systemLogger.debug(log.DBG_MSG.FUNC_RESULT, isOnlySpace(req.body.name));
  if (isOnlySpace(req.body.name)) {
    res.status(400);
    return res.json({ message: '文字を入力してください。' });
  }
  const colName = Object.keys(req.body).join(',');
  systemLogger.debug(log.DBG_MSG.FUNC_EXEC, createValue.name);
  systemLogger.debug(log.DBG_MSG.FUNC_RESULT, createValue(req.body, exercisesType));
  const value = createValue(req.body, exercisesType);
  systemLogger.debug(log.DBG_MSG.QUERY_EXEC, addExercise(colName, value));
  pool.query(addExercise(colName, value), (error, results) => {
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

router.delete('/delete', (req, res) => {
  systemLogger.debug(log.DBG_MSG.QUERY_EXEC, deleteExercise(req.body.name));
  pool.query(deleteExercise(req.body.name), (error, results) => {
    systemLogger.debug(log.DBG_MSG.QUERY_RESULT, results);
    if (error) {
      systemLogger.error(error);
      res.status(400);
      res.json({ message: '削除に失敗しました。' });
    } else {
      res.status(201);
      res.json({ message: '削除に成功しました。' });
    }
  });
});

module.exports = router;
