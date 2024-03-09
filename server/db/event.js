
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      eventID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      hostID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      eventPic: DataTypes.STRING,
      date: DataTypes.DATE,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      capacity: DataTypes.INTEGER,
    },
    {}
  );

  Event.associate = (models) => {
    Event.hasMany(models.UserEvents, {
      foreignKey: "eventID",
      as: "userEvents",
    });
    models.UserEvents.belongsTo(Event, { foreignKey: "eventID", as: "event" });
  };

  return Event;
};

