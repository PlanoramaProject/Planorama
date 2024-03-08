const express = require("express");
const passport = require("passport");

const router = express.Router();
const { eventController } = require("../server/controller/eventController");
const {
  userEventController,
} = require("../server/controller/userEventsController");
const {
  authenticationController,
} = require("../server/controller/authenticationController");
const { aiController } = require("../server/controller/aiController");

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

router.post(
  "/v1/event/prompt",
  aiController.generateMessage,
  (req, res, next) => {
    res.status(200).json({ message: "Ok!" });
  }
);

// Test endpoint to be deleted before push

router.post(
  "/testCreateUser",
  authenticationController.testCreateUser,
  (req, res, next) => {
    res.status(200).json({ message: "Ok!" });
  }
);

// router.post(
//   "/testVerify",
//   authenticationController.verify,
//   (req, res, next) => {
//     res.status(200).json({ message: "Ok!" });
//   }
// );
router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

module.exports = router;
