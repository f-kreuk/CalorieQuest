const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quest extends Model {}

Quest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    heightCentimeters: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    startingWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    goalWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dailyLossGoal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dailyLossActual: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    actualToGoal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    startingWeightKg: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    expectedFinalWeight: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
            unique: false,
        },
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'quest',
  }
);

module.exports = Quest;