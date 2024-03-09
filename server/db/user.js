
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
  password: { type: DataTypes.STRING, allowNull: false },
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
