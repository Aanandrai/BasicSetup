import express from "express";
import dotenv from "dotenv";
import app from "./src/app.js"
dotenv.config();



import sequelize from "./src/db/sequelizer.js"
import pool from "./src/db/dbConnection.js"


const startServer = async () => {
  try {
    console.log("---------DB Connection Start-----------------")
    await sequelize.authenticate();
    console.log("Sequelize connected");

    await sequelize.sync({ alter: true });
    console.log("Models synced");

    // Optional: test pool
    const result = await pool.query("SELECT NOW()");
    console.log("Pool connected at:", result.rows[0].now);

    console.log("---------DB Conencted-----------------")

    app.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
    );
  } catch (err) {
    console.error("Unable to start server:", err);
  }
};

startServer();