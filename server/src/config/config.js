// src/config/config.js
// This file holds all of our config for our server
module.exports = {
  port: process.env.PORT || 3001,
  db: {
    database: process.env.DB_NAME || "workshop",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    options: {
      // Dialect - refers to the type of database we are connecting to
      dialect: process.env.DIALECT || "sqlite",
      host: process.env.HOST || "locahost",
      // This will store to a file. Default option is memory.
      storage: "./workshop.sqlite",
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "HelloIamAsecret",
  },
};
// Note: We should store secrets and other sensitive information in enviromental variables. This file will look for those or use the default.
