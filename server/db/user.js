const { Sequelize, DataTypes } = require("sequelize");
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

const User = sequelize.define("User", {
  userID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  fullName: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  picture: DataTypes.STRING,
  phoneNum: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// User.sync({ force: true });

// sequelize.sync({ force: true }).then(() => {
//   console.log("Database synchronized");
//   // Start your server here
// });

module.exports = User;
