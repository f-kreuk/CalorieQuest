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
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    age: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height_ft: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height_in: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height_centimeters: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    starting_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    starting_weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    goal_weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    daily_loss_goal: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    daily_loss_actual: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    actual_to_goal: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    starting_weight_kg: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    progress: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    expected_final_weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'quest',
  }
);

module.exports = Quest;