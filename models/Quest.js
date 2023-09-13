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
      allowNull: false,
    },
    heightCentimeters: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startingWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goalWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dailyLossGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dailyLossActual: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actualToGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startingWeightKg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expectedFinalWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
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