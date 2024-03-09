const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/index");
const argon2 = require("argon2");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            console.log("no user");
            return done(null, false, { message: "Incorrect email." });
          }
          const validate = await argon2.verify(user.password, password);
          if (!validate) {
            console.log("password bad");
            return done(null, false, { message: "Incorrect password." });
          }
          console.log("password good");
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user.dataValues.userID);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      //   const user = await User.findByPk(id);
      const user = await User.findOne({ where: { userID: id } });
      req.user = user;
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
