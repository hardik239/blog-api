const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => req.body.token,
      secretOrKey: `${process.env.JWT_SECRET}`
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        console.log(err, user);
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false);
      user.comparePassword(password, done);
    });
  })
);
