const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

const cookieExtractor = (req) => {
  // let token = null;
  // // console.log("yhk");
  // if (req && req.cookies) {
  //   token = req.cookies["access_token"];
  // }
  // return token;
  return req.body.token;
};

// authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: `${process.env.JWT_SECRET}`
    },
    (payload, done) => {
      // console.log(payload + "payload");
      User.findById({ _id: payload.sub }, (err, user) => {
        console.log(err, user);
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

// authenticated local strategy using email and password
passport.use(
  new LocalStrategy((email, password, done) => {
    // console.log(email, password);
    User.findOne({ email }, (err, user) => {
      // something went wrong with database
      if (err) {
        // console.log(err);
        return done(err);
      }
      // if no user exist
      if (!user) {
        // console.log(user);
        return done(null, false);
      }
      // check if password is correct
      user.comparePassword(password, done);
    });
  })
);
