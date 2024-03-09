const user = require("../db/user");
const {
  User,
  Event,
  UserFriends,
  UserEvents,
  Sequelize,
} = require("../models/index");
const argon2 = require("argon2");
const authenticationController = {};

authenticationController.verify = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userEmail = await User.findOne({ where: { email } });
    console.log(userEmail.password);
    if (await argon2.verify(userEmail.password, password)) {
      return next();
    } else {
      const error = new Error("Verification failed");
      error.status = 401;
      return next(error);
    }
  } catch (e) {
    const error = new Error("Internal Server Error");
    error.status = 500;
    return next(error);
  }
};

authenticationController.testCreateUser = async (req, res, next) => {
  const { fullName, email, password, phoneNum } = req.body;
  console.log(email, password, phoneNum);
  try {
    const hash = await argon2.hash(password);
    await User.create({ fullName, email, password: hash, phoneNum });
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

module.exports = { authenticationController };
