const userQueries = require("../db/queries.users.js");
const passport = require("passport");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

  signUp(req, res, next){
    res.render("users/signup");
  },
  create(req, res, next){
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });

        const msg = {
          to: newUser.email,
          from: 'BigZ@Blocipedia.com',
          subject: 'Blocipedia Account Created!',
          text: 'Thank you for signing up with Blocipedia! Enjoy.',
          html: '<strong>Welcome to Blocipedia! Made by Zach G</strong>',
        };
      sgMail.send(msg);

      } // else
    }); // createUser

  } // create

} // mod