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

const Event = sequelize.define("Event", {
  eventID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  hostID: {
    type: DataTypes.UUID, // Assuming hostID is a UUID
    references: {
      model: User,
      key: "userID", // Assuming 'id' is the primaryKey in User model
    },
  },
  name: { type: DataTypes.STRING, allowNull: false },
  location: DataTypes.STRING,
  description: DataTypes.STRING,
  eventPic: DataTypes.STRING,
  date: DataTypes.DATE,
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
  capacity: DataTypes.INTEGER,
});

// sequelize.sync({ force: true }).then(() => {
//   console.log("Database synchronized");
//   // Start your server here
// });

// Event.sync({ force: true }).then(() => {
//   console.log("recreated");
// });

module.exports = Event;
