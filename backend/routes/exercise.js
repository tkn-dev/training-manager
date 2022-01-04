/* eslint-disable no-console */
const express = require('express');
const pool = require('../db');
const systemLogger = require('../log/systemLogger');
const log = require('../log/constants');

const router = express.Router();

const selectAll = 'SELECT name FROM exercises;';
const addExercise = (name) =>
  `INSERT INTO exercises (name) VALUES ('${name}');`;
const deleteExercise = (name) =>
  `DELETE FROM exercises WHERE name = '${name}';`;

router.get('/api', (req, res) => {
  systemLogger.debug(log.DBG.QUERY_EXEC, selectAll);
  pool.query(selectAll, (error, results) => {
    systemLogger.debug(results);
    if (error) {
      console.log(error);
      res.status(400);
      res.json({ message: '取得に失敗しました。' });
    } else {
      res.status(200);
      res.json({
        message: '取得に成功しました。',
        result: results.map((result) => result.name),
      });
    }
  });
});

router.post('/api', (req, res) => {
  systemLogger.debug(log.DBG.QUERY_EXEC, addExercise(req.body.name));
  pool.query(addExercise(req.body.name), (error, results) => {
    systemLogger.debug(results);
    if (error) {
      console.log(error);
      res.status(400);
      res.json({ message: '登録に失敗しました。' });
    } else {
      res.status(201);
      res.json({ message: '登録に成功しました。' });
    }
  });
});

router.delete('/api', (req, res) => {
  systemLogger.debug(log.DBG.QUERY_EXEC, deleteExercise(req.body.name));
  pool.query(deleteExercise(req.body.name), (error, results) => {
    systemLogger.debug(results);
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
