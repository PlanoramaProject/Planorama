const express = require("express");
const app = express();
const router = require("./api");
const { User, Event, UserFriends, UserEvents } = require("./db/associations");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "postgresql://postgres:postgres@planoramadb.cuqfjshz1zj6.us-east-2.rds.amazonaws.com:5432/",
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

app.use(express.json());
app.use("/api", router);
app.listen(3000, () => console.log("CONNECTED: listening on PORT", 3000));
