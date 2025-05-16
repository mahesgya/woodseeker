const mysql = require("mysql2/promise");
const config = require("../config/config");

async function getConnection() {
  try {
    const connection = await mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASS,
      database: config.DB_NAME,
      charset: "utf8",
    });

    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed");
  }
}

module.exports = { getConnection };
