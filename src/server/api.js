const express = require("express");
const router = express.Router();
const { eventController } = require("../server/controller/eventController");
const {
  userEventController,
} = require("../server/controller/userEventsController");
// const { User, Event, UserFriends, UserEvents } = require("./db/associations");

router.get("/v1/event/:eventID", eventController.getEvent, (req, res, next) => {
  res.status(200).json(res.locals.event);
});

router.get(
  "/v1/user/host/:userID/",
  eventController.getHostedEvents,
  (req, res, next) => {
    res.status(200).json(res.locals.event);
  }
);

router.get(
  "/v1/user/:userID/event/:status",
  userEventController.getUserEventsByStatus,
  (req, res, next) => {
    res.status(200).json(res.locals.event);
  }
);

router.get(
  "/v1/user/:userID/event/attend",
  userEventController.getAttendedEvents,
  (req, res, next) => {
    res.status(200).json(res.locals.event);
  }
);

router.post("/v1/event", eventController.createEvent, (req, res, next) => {
  return res.status(200).json(res.locals.event);
});
router.put("/v1/event", eventController.updateEvent, (req, res, next) => {
  res.status(200).json(res.locals.event);
});
router.delete("/v1/event", eventController.deleteEvent, (req, res, next) => {
  res.status(200);
});

router.post(
  "/v1/event/user",
  userEventController.createOrUpdateStatus,
  (req, res, next) => {
    res.status(200).json(res.locals.event);
  }
);

module.exports = router;
