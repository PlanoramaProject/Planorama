module.exports = (sequelize, DataTypes) => {
  const UserEvents = sequelize.define("UserEvents", {
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    eventID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    status: DataTypes.STRING,
  });

  UserEvents.associate = (models) => {
    UserEvents.belongsTo(models.User, { foreignKey: "userID" });
    UserEvents.belongsTo(models.Event, { foreignKey: "eventID" });
  };

  return UserEvents;
};
