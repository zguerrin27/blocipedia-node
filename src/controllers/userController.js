const userQueries = require("../db/queries.users.js");
const passport = require("passport");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

  signUp(req, res, next){
    res.render("users/signup");
  },
  signInForm(req, res, next){
    res.render("users/signin");
  },
  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/signin");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },
  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },
  create(req, res, next){

    if(req.body.password !== req.body.passwordConfirmation){
      req.flash("error");
      res.redirect("/users/signup");
    }

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
          from: 'AdminZ@Blocipedia.com',
          subject: 'Blocipedia Account Created!',
          text: 'Thank you for signing up with Blocipedia! Enjoy.',
          html: '<strong>Welcome to Blocipedia! A place for users to share information and expand their minds. Made by Zach </strong>',
        };

      sgMail.send(msg)
      } 
    }); 

  } 

} 