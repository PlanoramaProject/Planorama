const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
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
const UserFriends = sequelize.define(
  "UserFriends",
  {
    userID: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "userID",
      },
      primaryKey: true,
    },
    friendID: {
      type: DataTypes.UUID,
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
