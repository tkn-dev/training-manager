const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const exercises = sequelize.define(
  'Exercise',
  {
    name: { type: DataTypes.STRING },
    is_aerobic: { type: DataTypes.BOOLEAN },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

const records = sequelize.define(
  'Record',
  {
    exercise_date: { type: DataTypes.DATEONLY },
    exercise: { type: DataTypes.STRING },
    set_number: { type: DataTypes.INTEGER },
    weight: { type: DataTypes.DECIMAL },
    weight_type: { type: DataTypes.STRING },
    repetition: { type: DataTypes.INTEGER },
    is_supported: { type: DataTypes.BOOLEAN },
    distance: { type: DataTypes.DECIMAL },
    distance_type: { type: DataTypes.STRING },
    exercise_time: { type: DataTypes.TIME },
    memo: { type: DataTypes.STRING },
    recorded_at: { type: DataTypes.DATE },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = { exercises, records };
