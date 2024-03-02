const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const Event = require("./event");
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
const UserEvents = sequelize.define("UserEvents", {
  userID: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "userID",
    },
    primaryKey: true,
  },
  eventID: {
    type: DataTypes.UUID,
    references: {
      model: Event,
      key: "eventID",
    },
    primaryKey: true,
  },
  status: DataTypes.STRING,
});

async function syncModels() {
  try {
    // Sync individual models in dependency order
    await User.sync({ force: true });
    await Event.sync({ force: true });
    await UserEvents.sync({ force: true });

    console.log("UserEvents Database synchronized");
    // Start your server here
  } catch (error) {
    console.error("Error during model synchronization:", error);
  }
}

// syncModels();
module.exports = UserEvents;
