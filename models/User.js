const { Model, DataTypes, QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    startDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startingWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    heightFeet: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    heightInches: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    heightCentimeters: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    allQuests: {
      type: DataTypes.JSON,
      defaultValue: { active: [], past: [] },
    },
    activeQuest: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;