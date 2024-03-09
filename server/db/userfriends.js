
module.exports = (sequelize, DataTypes) => {
  const UserFriends = sequelize.define(
    "UserFriends",
    {
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      friendID: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return UserFriends;
};

