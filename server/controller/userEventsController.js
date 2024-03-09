const {
  User,
  Event,
  UserFriends,
  UserEvents,
  Sequelize,
} = require("../models/index");
const { Op } = Sequelize;

const userEventController = {};

userEventController.createOrUpdateStatus = async (req, res, next) => {
  const { userID, eventID, status } = req.body;
  if (!userID || !eventID) {
    return next("Error goes here");
  }
  try {
    const userEvent = await UserEvents.findOne({
      where: { userID: userID, eventID: eventID },
    });
    if (userEvent) {
      const updateData = { userID, eventID, status };
      Object.assign(userEvent, updateData);
      const userEventData = await UserEvents.save();
      console.log(userEventData.dataValues);
      res.locals.userEvent = userEventData.dataValues;
      return next();
    }

    await UserEvents.create({ userID, eventID, status });
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

userEventController.getUserEventsByStatus = async (req, res, next) => {
  const { userID, status } = req.params;
  console.log(status);
  if (!userID || !status) {
    return next("Error goes here");
  }
  try {
    const events = await Event.findAll({
      include: [
        {
          model: UserEvents,
          as: "userEvents",
          attributes: [],
          where: { status: status, userID: userID },
        },
      ],
    });
    res.locals.event = events;
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

userEventController.getAttendedEvents = async (req, res, next) => {
  const { userID } = req.params;
  if (!userID) {
    return next("Error msg goes here");
  }
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.findAll({
      include: [
        {
          model: UserEvents,
          as: "userEvents",
          attributes: [],
          where: { userID: userID, status: "yes" },
        },
      ],
      where: {
        date: {
          [Op.lt]: today,
        },
      },
    });
    req.locals.events = events;
    return next();
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = { userEventController };
