const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DailyLog extends Model {}

DailyLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quest_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quest',
        key: 'id',
        unique: false,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    formatted_date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expected_weight: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    calories_consumed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exercise: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    daily_weight_loss: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    bmr: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    adjusted_bmr: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    exercise_reference: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    daily_goal: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    target_calories: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calorie_deficit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    actual_to_deficit: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'dailylog',
    tableName: 'dailylogs',
    timestamps: false,
  }
);

module.exports = DailyLog;
