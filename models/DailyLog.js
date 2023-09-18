const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DailyLog extends Model {}

DailyLog.init(
  {
    dailyLogID: {
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
      allowNull: false,
    },
    expectedWeight: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    caloriesConsumed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exercise: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    dailyWeightLoss: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    bmr: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    adjustedBMR: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    exerciseReference: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    dailyGoal: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    targetCalories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calorieDeficit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    actualToDeficit: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'DailyLog',
    tableName: 'DailyLogs',
    timestamps: false,
  }
);

module.exports = DailyLog;
