const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DailyLog extends Model {}

DailyLog.init(
  {
    dailyLogID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    expectedWeight: DataTypes.DECIMAL(6, 2),
    weight: DataTypes.DECIMAL(6, 2),
    caloriesConsumed: DataTypes.INTEGER,
    exercise: DataTypes.DECIMAL(6, 2),
    dailyWeightLoss: DataTypes.DECIMAL(6, 2),
    bmr: DataTypes.DECIMAL(6, 2),
    adjustedBMR: DataTypes.DECIMAL(6, 2),
    exerciseReference: DataTypes.DECIMAL(6, 2),
    dailyGoal: DataTypes.DECIMAL(6, 2),
    targetCalories: DataTypes.INTEGER,
    calorieDeficit: DataTypes.INTEGER,
    actualToDeficit: DataTypes.DECIMAL(6, 2),
  },
  {
    sequelize, 
    modelName: 'DailyLog',
    tableName: 'DailyLogs',
    timestamps: false,
  }
);

module.exports = DailyLog;
