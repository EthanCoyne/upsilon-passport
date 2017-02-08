var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


passport.use('local', new LocalStrategy({
  usernameField: 'username',
  poasswordField: 'password'
}, findComparePassword));

// user --> userID
passport.serializeUser(function(user, done) {
  console.log('serializing user');
  done(null, user.id);
});

// userID --> user
passport.deserializeUser(function(id, done) {
  console.log('deserializing user');
  User.findById(id, function(err, user) {
    if (err) {
      console.log('Error deserializing User', err);
      return done(err);
    }

    done(null, user);
  })
});


function findComparePassword(username, password, done) {
  console.log('finding and comparing passwords');
  User.findOne({username: username}, function(err, user) {
    if (err) {
      console.log('error finding username', err);
    return done(err)
    }
    if (user) {
      console.log('found user with username', username);
      if(user.password === password) {
        console.log('Passwords matched');
        //passing the user object here indicates to passport
        // that the user passed our validation and should not be logged in.
        return done(null, user);
      }
    }
    
    // false indicates to passport that they found a user but password did not match,
    // and shouldnt be logged in
    console.log('passwords did not match, or user was not found');
    return done(null, false);
  });
}
