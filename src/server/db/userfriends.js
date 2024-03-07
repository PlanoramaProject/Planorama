// const { Sequelize, DataTypes } = require("sequelize");
// const User = require("./user");
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
// const UserFriends = sequelize.define(
//   "UserFriends",
//   {
//     userID: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: User,
//         key: "userID",
//       },
//       primaryKey: true,
//     },
//     friendID: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: User,
//         key: "userID",
//       },
//       primaryKey: true,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// // sequelize.sync({ force: true }).then(() => {
// //   console.log("Database synchronized");
// //   // Start your server here
// // });
// // UserFriends.sync({ force: true }).then(() => {
// //   console.log("recreated");
// // });

// module.exports = UserFriends;

module.exports = (sequelize, DataTypes) => {
  const UserFriends = sequelize.define(
    "UserFriends",
    {
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        // The actual foreign key association will be handled in the `associate` method
        primaryKey: true,
      },
      friendID: {
        type: DataTypes.UUID,
        allowNull: false,
        // The actual foreign key association will be handled in the `associate` method
        primaryKey: true,
      },
    },
    {
      timestamps: false, // Assuming you want to explicitly disable timestamps
    }
  );

  // UserFriends.associate = (models) => {
  //   // Set up the self-referencing association here
  //   models.User.belongsToMany(models.User, {
  //     through: UserFriends,
  //     as: "Friends", // This alias is used when you query Users and include their friends
  //     foreignKey: "userID", // The column in UserFriends that points to the User id
  //     otherKey: "friendID", // Used to reference the "other side" of the relationship
  //   });
  // };

  return UserFriends;
};
