const { User, Event, UserFriends, UserEvents } = require("../db/associations");

const eventController = {};

eventController.createEvent = async (req, res, next) => {
  console.log('req body', req.body)
  const {
    eventName,
    hostName,
    location,
    description,
    eventPic,
    date,
    startTime,
    endTime,
    capacity,
  } = req.body;
  if (!hostName || !eventName) {
    return next("Error goes here");
  }
  try {
    const user = await User.findOne({ where: { fullName: hostName } });
    const eventProps = await Event.create({
      hostID: user.userID,
      name: eventName,
      location,
      description,
      eventPic,
      date,
      startTime,
      endTime,
      capacity,
    });
    res.locals.event = eventProps;
    return next();
  } catch (e) {
    return next(e);
  }
};

eventController.getEvent = async (req, res, next) => {
  const { eventID } = req.params;
  if (!eventID) {
    return next("Error message here");
  }
  try {
    const eventProps = await Event.findOne({ where: { eventID: eventID } });
    console.log(eventProps);
    res.locals.event = eventProps;
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

eventController.updateEvent = async (req, res, next) => {
  const {
    eventName,
    location,
    description,
    eventPic,
    date,
    startTime,
    endTime,
    capacity,
  } = req.body;
  if (!eventName) {
    return next("This shit doesn't work");
  }
  const updateData = {
    eventName,
    location,
    description,
    eventPic,
    date,
    startTime,
    endTime,
    capacity,
  };
  try {
    const event = await Event.findOne({ where: { name: eventName } });
    if (event) {
      event.eventID;
      Object.assign(event, updateData);
      const eventProps = await event.save();
      console.log(eventProps.dataValues);
      res.locals.event = eventProps.dataValues;
    }
    return next();
  } catch (e) {
    return next(e);
  }
};

eventController.deleteEvent = async (req, res, next) => {
  const { eventName, hostName } = req.body;
  if (!eventName || !hostName) {
    return next("EventName or HostName not provided");
  }
  try {
    const user = await User.findOne({ where: { fullName: hostName } });
    await Event.destroy({ where: { name: eventName, hostID: user.userID } });
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

module.exports = { eventController };
