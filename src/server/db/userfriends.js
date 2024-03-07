const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
require("dotenv").config();
const { pg } = require("pg");
const sequelize = new Sequelize(process.env.PGURI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
const UserFriends = sequelize.define(
  "UserFriends",
  {
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userID",
      },
      primaryKey: true,
    },
    friendID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userID",
      },
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

// sequelize.sync({ force: true }).then(() => {
//   console.log("Database synchronized");
//   // Start your server here
// });
// UserFriends.sync({ force: true }).then(() => {
//   console.log("recreated");
// });

module.exports = UserFriends;
