const express = require("express");
const app = express();
const router = require("./api");
const {
  User,
  Event,
  UserFriends,
  UserEvents,
  sequelize,
  Sequelize,
} = require("./models/index");
require("dotenv").config();

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Database & tables created!");
//   })
//   .catch((error) => {
//     console.error("Failed to sync database:", error);
//   });
// app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, () =>
  console.log("CONNECTED: listening on PORT", process.env.PORT)
);
