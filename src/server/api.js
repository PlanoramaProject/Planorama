const express = require("express");
const router = express.Router();
const { User, Event, UserFriends, UserEvents } = require("./db/associations");
const { userController } = require('./controllers/userController');


router.get("/user", userController.getUser, (req, res) => {
  console.log("get user success");
  res.status(200).send(res.locals.success);
});

router.post("/user", userController.createUser, (req, res, next) => {
  console.log('create user success');
  res.status(200).send('create was a success');
});


router.get("/user/all", async (req,res) => {
  const users = await User.findAll();
  res.status(200).send(users);
})

router.delete("/user", userController.deleteUser, (req, res) => {
  console.log("delete successful");
  res.status(200).send('delete was a success');
})

module.exports = router;

// const express = require("express");
// const router = express.Router();
// // const { User, Event, UserFriends, UserEvents } = require("./db/associations");

// // Sample endpoint

// router.get("/v1/User", (req, res, next) => {
//   console.log("sample User endpoitn");
//   res.status(200);
// });
// router.post("/v1/User", (req, res, next) => {
//   console.log("sample User endpoitn");
//   res.status(200);
// });
// router.update("/v1/User", (req, res, next) => {
//   console.log("sample User endpoitn");
//   res.status(200);
// });
// router.delete("/v1/User", (req, res, next) => {
//   console.log("sample User endpoitn");
//   res.status(200);
// });




// router.get("/v1/Event", (req, res, next) => {
//   console.log("sample User endpoitn");
//   res.status(200);
// });



// router.get("/v1/UserEvents", (req, res, next) => {
//   console.log("sample User endpoitn");
//   res.status(200);
// });



// router.get("/v1/UserFriends", (req, res, next) => {
//   console.log("sample User endpoitn");
//   res.status(200);
// });
// module.exports = router;