const express = require("express");
const app = express();
const router = require("./api");
const { User, Event, UserFriends, UserEvents } = require("./db/associations");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.PGURI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

app.use(express.json());
app.use("/api", router);
app.listen(process.env.PORT, () =>
  console.log("CONNECTED: listening on PORT", process.env.PORT)
);
