const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const UserEvents = require("./userevents");
const Event = require("./event");
const UserFriends = require("./userfriends");
const { pg } = require("pg");
require("dotenv").config();

const sequelize = new Sequelize(process.env.PGURI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Note: Setting this to false can create security vulnerabilities.
    },
  },
});

User.hasMany(Event, { foreignKey: "hostID" });
Event.belongsTo(User, { as: "Host", foreignKey: "hostID" });

User.belongsToMany(User, {
  as: "Friends",
  through: UserFriends,
  foreignKey: "userID",
  otherKey: "friendID",
});

User.belongsToMany(Event, {
  through: UserEvents,
  foreignKey: "userID",
  otherKey: "eventID",
});

Event.belongsToMany(User, {
  through: UserEvents,
  foreignKey: "eventID",
  otherKey: "userID",
});

// sequelize.sync({ force: true }).then(() => {
//   console.log("Database synchronized");
//   // Start your server here
// });

module.exports = { User, Event, UserFriends, UserEvents, sequelize };
