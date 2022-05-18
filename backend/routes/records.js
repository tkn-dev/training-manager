const express = require('express');
const { Op, Sequelize } = require('sequelize');
const { sequelize } = require('../db');
const { exercises, records } = require('../tables');
const systemLogger = require('../log/systemLogger');

const router = express.Router();

records.belongsTo(exercises, {
  foreignKey: 'exercise',
  targetKey: 'name',
});

router.post('/get/specified-month', (req, res) => {
  records
    .findAll({
      include: [{ model: exercises, attributes: ['is_aerobic'] }],
      where: {
        exercise_date: {
          // 先月２６日から次月14日までのレコードを対象にする。（表示されうる日付の最大範囲。）
          [Op.between]: [`${req.body.prevYearMonth}-26`, `${req.body.nextYearMonth}-14`],
        },
      },
      order: [['recorded_at', 'ASC']],
    })
    .then((rows) => {
      res.status(200);
      res.json({
        message: '取得に成功しました。',
        results: rows,
      });
    })
    .catch((error) => {
      systemLogger.error(error);
      res.status(400);
      res.json({
        message: '取得に失敗しました。',
      });
    });
});

router.post('/get/date', (req, res) => {
  records
    .findAll({
      include: [{ model: exercises, attributes: ['is_aerobic'] }],
      where: { exercise_date: req.body.date },
      order: [['recorded_at', 'ASC']],
    })
    .then((rows) => {
      res.status(200);
      res.json({
        message: '取得に成功しました。',
        results: rows,
      });
    })
    .catch((error) => {
      systemLogger.error(error);
      res.status(400);
      res.json({
        message: '取得に失敗しました。',
      });
    });
});

router.post('/new', async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    // 全項目を検査し、空文字の場合はnullをセットする
    for (let record of req.body) {
      Object.keys(record).map((key) => {
        if (record[key] === '') record[key] = null;
      });
      await records.create(
        { ...record, recorded_at: Sequelize.literal('CURRENT_TIMESTAMP') },
        { transaction: transaction },
      );
    }
    await transaction.commit();
    res.status(201);
    return res.json({ message: '登録に成功しました。' });
  } catch (error) {
    await transaction.rollback();
    systemLogger.error(error);
    res.status(400);
    return res.json({ message: '登録に失敗しました。' });
  }
});

router.put('/update', async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    await records.destroy({
      where: { exercise: req.body.exercise, recorded_at: req.body.recorded_at },
      transaction: transaction,
    });
    for (let record of req.body.record) {
      Object.keys(record).map((key) => {
        if (record[key] === '') record[key] = null;
      });
      await records.create({ ...record }, { transaction: transaction });
    }
    await transaction.commit();
    res.status(201);
    return res.json({ message: '更新に成功しました。' });
  } catch (error) {
    await transaction.rollback();
    systemLogger.error(error);
    res.status(400);
    return res.json({ message: '更新に失敗しました。' });
  }
});

router.delete('/delete', async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const deletedrow = await records.destroy({
      where: { exercise: req.body.exercise, recorded_at: req.body.recorded_at },
      transaction: transaction,
    });
    if (deletedrow == req.body.set_number) {
      await transaction.commit();
      res.status(200);
      return res.json({ message: '削除に成功しました。' });
    } else {
      await transaction.rollback();
      systemLogger.error(
        `failed to delete a part of the record.(expected: ${req.body.set_number}, actual: ${deletedrow})`,
      );
      res.status(400);
      return res.json({ message: '削除が一部失敗しました。' });
    }
  } catch (error) {
    await transaction.rollback();
    systemLogger.error(error);
    res.status(400);
    return res.json({ message: '削除に失敗しました。' });
  }
});

module.exports = router;
