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

const User = sequelize.define("User", {
  userID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  fullName: { type: DataTypes.STRING, allowNull: false, unique: true },
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
