// const { Sequelize, DataTypes } = require("sequelize");
// require("dotenv").config();
// const { pg } = require("pg");
// const sequelize = new Sequelize(process.env.PGURI, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// const User = sequelize.define("User", {
//   userID: {
//     type: DataTypes.UUID,
//     primaryKey: true,
//     defaultValue: DataTypes.UUIDV4,
//   },
//   fullName: { type: DataTypes.STRING, allowNull: false, unique: true },
//   email: { type: DataTypes.STRING, unique: true },
//   picture: DataTypes.STRING,
//   phoneNum: { type: DataTypes.STRING, allowNull: false, unique: true },
// });

// User.hasMany(Event, { foreignKey: "hostID" });
// Event.belongsTo(User, { as: "Host", foreignKey: "hostID" });

// User.belongsToMany(User, {
//   as: "Friends",
//   through: UserFriends,
//   foreignKey: "userID",
//   otherKey: "friendID",
// });

// User.belongsToMany(Event, {
//   through: UserEvents,
//   foreignKey: "userID",
//   otherKey: "eventID",
// });

// Event.belongsToMany(User, {
//   through: UserEvents,
//   foreignKey: "eventID",
//   otherKey: "userID",
// });

// // User.sync({ force: true });

// // sequelize.sync({ force: true }).then(() => {
// //   console.log("Database synchronized");
// //   // Start your server here
// // });

// module.exports = User;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    picture: DataTypes.STRING,
    phoneNum: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  User.associate = (models) => {
    // Define associations here
    // For example:
    User.hasMany(models.Event, { foreignKey: "hostID" });
    models.Event.belongsTo(User, { as: "Host", foreignKey: "hostID" });

    User.belongsToMany(User, {
      as: "Friends",
      through: models.UserFriends,
      foreignKey: "userID",
      otherKey: "friendID",
    });

    User.belongsToMany(models.Event, {
      through: models.UserEvents,
      foreignKey: "userID",
      otherKey: "eventID",
    });

    models.Event.belongsToMany(User, {
      through: models.UserEvents,
      foreignKey: "eventID",
      otherKey: "userID",
    });
  };

  return User;
};
