// const { Sequelize, DataTypes } = require("sequelize");
// const User = require("./user");
// const Event = require("./event");
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
// const UserEvents = sequelize.define("UserEvents", {
//   userID: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: User,
//       key: "userID",
//     },
//     primaryKey: true,
//   },
//   eventID: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: Event,
//       key: "eventID",
//     },
//     primaryKey: true,
//   },
//   status: DataTypes.STRING,
// });

// // async function syncModels() {
// //   try {
// //     // Sync individual models in dependency order
// //     await User.sync({ force: true });
// //     await Event.sync({ force: true });
// //     await UserEvents.sync({ force: true });

// //     console.log("UserEvents Database synchronized");
// //     // Start your server here
// //   } catch (error) {
// //     console.error("Error during model synchronization:", error);
// //   }
// // }

// // syncModels();
// module.exports = UserEvents;
module.exports = (sequelize, DataTypes) => {
  const UserEvents = sequelize.define("UserEvents", {
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
      // You'll set up the references in the association method, not here
      primaryKey: true,
    },
    eventID: {
      type: DataTypes.UUID,
      allowNull: false,
      // You'll set up the references in the association method, not here
      primaryKey: true,
    },
    status: DataTypes.STRING,
  });

  UserEvents.associate = (models) => {
    // Assumes userID and eventID are correctly defined in User and Event models, respectively
    UserEvents.belongsTo(models.User, { foreignKey: "userID" });
    UserEvents.belongsTo(models.Event, { foreignKey: "eventID" });

    // If you have other associations related to UserEvents, define them here
  };

  return UserEvents;
};
