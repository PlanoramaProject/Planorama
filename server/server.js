const express = require("express");
const app = express();
const router = require("./api");
const passport = require("passport");
const session = require("express-session");
require("./auth/passport-config")(passport);

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

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(express.json());
app.use(passport.session());
app.use(passport.initialize());

app.use("/api", router);
app.use(express.static(path.join(__dirname, "../", "build")));
app.use((req, res) => res.status(404).send("Error 404, path not found"));
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: err.message });
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error in server.js",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.error(errorObj.log);
  return res.status(errorObj.status || 500).json(errorObj.message);
});

app.listen(process.env.PORT, () =>
  console.log("CONNECTED: listening on PORT", process.env.PORT)
);
