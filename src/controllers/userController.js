const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis");
const passport = require("passport");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const stripe = require('stripe')(process.env.stripeKey);
const stripePublishKey = process.env.publishStripeKey;

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
        req.flash("notice", "Login failed, please try again.");
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
  },
  show(req, res, next){
    userQueries.getUser(req.params.id, (err, result) => {
      if(err || result.user === undefined){
        req.flash("notice", "No user found with that ID.");
        res.redirect("/");
      } else {
        res.render("users/show", {...result});
      }
    });
  },
  upgrade(req, res, next) {
    const payment = 1500;
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => {
      return stripe.charges.create({
        amount: payment,
        description: "Blocipedia Premium Account",
        currency: "usd",
        customer: customer.id
      });
    })
    .then(charge => {
      if (charge) {
        userQueries.upgrade(req.params.id); 
          req.flash("notice", "You're now a premium user! Start making your private wikis.");
          res.redirect("/users/" + req.user.id);
      } else {
        req.flash("notice", "Payment Unsuccessful. Please try again.");
        res.redirect("/users/" + req.user.id);
      }
    })
    .catch(err => {
      console.log(err);
    });
  },
  downgrade(req, res, next){
    userQueries.downgrade(req.user.dataValues.id);
    wikiQueries.makeWikisPublic(req.user.id);
    req.flash("notice", "You are no longer a premium user");
    res.redirect("/users/" + req.user.id);
  }

} 