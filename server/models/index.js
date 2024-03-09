const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const { pg } = require("pg");
const sequelize = new Sequelize(process.env.PGURI, {
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const models = {
  User: require("../db/user")(sequelize, DataTypes),
  Event: require("../db/event")(sequelize, DataTypes),
  UserEvents: require("../db/userevents")(sequelize, DataTypes),
  UserFriends: require("../db/userfriends")(sequelize, DataTypes),
  // Add any other models here
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  ...models,
  sequelize, // the Sequelize instance
  Sequelize, // the Sequelize library itself, in case it's needed
};
