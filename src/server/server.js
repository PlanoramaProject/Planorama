const express = require("express");
const app = express();
const router = require("./api");
const { User, Event, UserFriends, UserEvents } = require("./db/associations");
const { Sequelize, DataTypes } = require("sequelize");
const path = require('path');

const dotenv = require('dotenv').config();
if(dotenv.error) console.error(dotenv.error);

const port = process.env.PORT;
const pgUri = String(process.env.PGURI);

const sequelize = new Sequelize(
  pgUri,
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
app.use(express.static(path.join(__dirname, '../', 'build')));



app.use((req, res) => res.status(404).send('Error 404, path not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log : 'Express error handler caught unknown middleware error in server.js',
    status: 400,
    message: { err: 'An error occurred'} 
  };
  const errorObj = Object.assign(defaultErr, err);
  console.error(errorObj.log);
  return res.status(errorObj.status || 500).json(errorObj.message);
});


// app.listen(3000, () => console.log("CONNECTED: listening on PORT", 3000));
app.listen(port, () => console.log("CONNECTED: listening on PORT", port));
module.exports = app;