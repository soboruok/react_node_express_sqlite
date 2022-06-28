// /src/models.js
// This file will create our database and tables if needed.
// Import Sequelize class
const { Sequelize, DataTypes } = require("sequelize");
// Import config
const config = require("../config/config");

// Create a db variable
let db = {};

// Create a new sequlize object.
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

// Create a model for sequelize
//title price image description
const Service = sequelize.define("Service", {
  C_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING },
  cat: { type: DataTypes.STRING },
  price: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
});

// FeedBack
const FeedBack = sequelize.define("FeedBack", {
  F_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  FName: { type: DataTypes.STRING },
  FEmail: { type: DataTypes.STRING },
  FTitle: { type: DataTypes.STRING },
  FDescription: { type: DataTypes.STRING },
});

// Blog
const Blog = sequelize.define("Blog", {
  B_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  BCat: { type: DataTypes.STRING },
  BName: { type: DataTypes.STRING },
  BTitle: { type: DataTypes.STRING },
  BDescription: { type: DataTypes.STRING },
});

// Create a mode for our Users
const User = sequelize.define("User", {
  // Primary key
  U_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  // Allow Null: false means that we must have a value for this field
  // unique: true, means we can only have the one email in the table.
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // There must be a password.
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Role base authentication
  // False by default.
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Add to the db variable.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Set up exports.
module.exports = db;
module.exports.Op = Sequelize.Op;
